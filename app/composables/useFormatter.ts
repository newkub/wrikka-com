export const useFormatter = () => {
	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("th-TH", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	return { formatDate };
};
