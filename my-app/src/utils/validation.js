export function validateURL(url) {
	// Regular expression to match a valid URL
	const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
	return urlPattern.test(url);
}

export const validateEmail = (email) => {
	// Regular expression for basic email validation
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailPattern.test(email);
};
