const validate = (value, type) => {
	const regExpType = {
		email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g,
	}[type];

	return Boolean(regExpType.exec(value));
};

export default validate;
