export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const fileId = url.searchParams.get('id');

  // 1. Student Route: Download a Specific File
  if (request.method === 'GET' && fileId) {
    const fileData = await env.FILE_STORE.getWithMetadata(fileId, { type: 'arrayBuffer' });
    if (!fileData.value) {
      return new Response('File not found or expired', { status: 404 });
    }
    
    const filename = fileData.metadata?.filename || 'download';
    return new Response(fileData.value, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${encodeURIComponent(filename)}"`,
      },
    });
  }

  // 2. Student Route: Fetch List of Active Files
  if (request.method === 'GET') {
    const list = await env.FILE_STORE.list();
    const files = list.keys.map(k => ({
      id: k.name,
      name: k.metadata?.filename || k.name,
      expires: k.expiration
    }));
    return new Response(JSON.stringify(files), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // 3. Teacher Route: Upload a File with Expiration
  if (request.method === 'POST') {
    try {
      const formData = await request.formData();
      const file = formData.get('file');
      const password = formData.get('password');
      const ttlInput = parseInt(formData.get('ttl')) || 3600;

      // Security check
      if (password !== env.TEACHER_PASSWORD) {
        return new Response('Invalid Access Code', { status: 401 });
      }
      if (!file) {
        return new Response('No file provided', { status: 400 });
      }

      const fileId = crypto.randomUUID();
      const arrayBuffer = await file.arrayBuffer();

      // Store file inside Cloudflare KV with automated TTL deletion
      await env.FILE_STORE.put(fileId, arrayBuffer, {
        expirationTtl: Math.max(60, ttlInput), 
        metadata: { filename: file.name }
      });

      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (err) {
      return new Response(err.message, { status: 500 });
    }
  }

  return new Response('Method not allowed', { status: 405 });
}