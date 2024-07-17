export default function parseErrorMessage(error: any): string {
	try {
	  let messages: string[] = [];
  
	  if (error.title) {
		messages.push(error.title);
	  }

	  if (error.message) {
		const message = error.message.replace(/^"|"$/g, '');
		messages.push(message);
	  }

	  return messages.join("\n") || "An unexpected error occurred.";
	} catch (e) {
	  return "An unexpected error occurred.";
	}
  }
  