import type { RequestHandler } from "./$types";

// api/newsletter GET
export const GET: RequestHandler = async () => {
	const options: ResponseInit = {
		status: 418,
		headers: {
			x: 'Gon give it to ya'
		}
	};

	return new Response('Helllo', options);
};

// api/newsletter POST
export const POST: RequestHandler = async (event) => {
	const data = await event.request.formData();
	const email = data.get('email');

	// subscribe the user to the newsletter
	console.log(email);

	return new Response(JSON.stringify({ success: true }), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
