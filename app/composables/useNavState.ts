export const useNavState = () => {
	const activeSection = useState("active-section", () => "profile");
	return { activeSection };
};
