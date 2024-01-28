export const validationRules = {
	title: {
		rule: (value: string | number) => value === "" || String(value).length > 50,
		message: (value: string | number) => {
			if (value === "") {
				return "入力必須項目です";
			} else if (String(value).length > 50) {
				return "50文字以内の項目です";
			}
			return undefined;
		},
	},
	content: {
		rule: (value: string | number) =>
			value === "" || String(value).length > 250,
		message: (value: string | number) => {
			if (value === "") {
				return "入力必須項目です";
			} else if (String(value).length > 250) {
				return "250文字以内の項目です";
			}
			return undefined;
		},
	},
	location: {
		rule: (value: string | number) => String(value) === "0",
		message: (value: string | number) => {
			if (value === 0) {
				return "選択必須項目です";
			}
		},
	},
};
