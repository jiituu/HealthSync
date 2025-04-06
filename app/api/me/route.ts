import { cookies } from 'next/headers';

function handler() {
  const cookieStore = cookies();
  console.log(cookieStore)
  const token = cookieStore.get('jwt')?.value;

  return new Response(JSON.stringify({ token }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export { handler as GET, handler as POST };
