import type { Repo } from "../../shared/types/repos";

export type GroupBy = "date" | "language" | "topics";

export interface GroupedRepos {
	label: string;
	repos: Repo[];
	count: number;
}

export const useGroupedRepos = (repos: Ref<Repo[]>) => {
	const groupBy = ref<GroupBy>("date");
	const searchQuery = ref("");
	const selectedGroups = ref<Set<string>>(new Set());

	const formatDate = (dateString: string): string => {
		const date = new Date(dateString);
		const now = new Date();
		const diffTime = Math.abs(now.getTime() - date.getTime());
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		if (diffDays <= 7) return "This Week";
		if (diffDays <= 30) return "This Month";
		if (diffDays <= 90) return "Last 3 Months";
		if (diffDays <= 180) return "Last 6 Months";
		if (diffDays <= 365) return "This Year";

		return date.getFullYear().toString();
	};

	const groupedRepos = computed(() => {
		let filteredRepos = repos.value;

		if (searchQuery.value) {
			const query = searchQuery.value.toLowerCase();
			filteredRepos = filteredRepos.filter(
				(repo) =>
					repo.name.toLowerCase().includes(query) ||
					repo.description?.toLowerCase().includes(query) ||
					repo.topics?.some((topic) => topic.toLowerCase().includes(query)),
			);
		}

		const groups = new Map<string, Repo[]>();

		filteredRepos.forEach((repo) => {
			let groupKey = "";

			switch (groupBy.value) {
				case "date":
					groupKey = formatDate(repo.updated_at);
					break;
				case "language":
					groupKey = repo.language || "Other";
					break;
				case "topics":
					if (repo.topics && repo.topics.length > 0) {
						repo.topics.forEach((topic) => {
							if (!groups.has(topic)) {
								groups.set(topic, []);
							}
							groups.get(topic)!.push(repo);
						});
						return;
					}
					groupKey = "No Topics";
					break;
			}

			if (!groups.has(groupKey)) {
				groups.set(groupKey, []);
			}
			groups.get(groupKey)!.push(repo);
		});

		let result: GroupedRepos[] = [];

		if (groupBy.value === "date") {
			const dateOrder = ["This Week", "This Month", "Last 3 Months", "Last 6 Months", "This Year"];
			result = dateOrder
				.filter((date) => groups.has(date))
				.map((date) => ({
					label: date,
					repos: groups.get(date)!,
					count: groups.get(date)!.length,
				}));

			const years = Array.from(groups.keys())
				.filter((key) => !dateOrder.includes(key))
				.sort((a, b) => Number(b) - Number(a));

			years.forEach((year) => {
				result.push({
					label: year,
					repos: groups.get(year)!,
					count: groups.get(year)!.length,
				});
			});
		} else if (groupBy.value === "language") {
			result = Array.from(groups.entries())
				.map(([label, repos]) => ({ label, repos, count: repos.length }))
				.sort((a, b) => {
					if (a.label === "Other") return 1;
					if (b.label === "Other") return -1;
					return b.count - a.count;
				});
		} else if (groupBy.value === "topics") {
			result = Array.from(groups.entries())
				.map(([label, repos]) => ({ label, repos, count: repos.length }))
				.sort((a, b) => b.count - a.count);
		}

		if (selectedGroups.value.size > 0) {
			result = result.filter((group) => selectedGroups.value.has(group.label));
		}

		return result;
	});

	const availableGroups = computed(() => {
		const groups = new Set<string>();

		repos.value.forEach((repo) => {
			switch (groupBy.value) {
				case "date":
					groups.add(formatDate(repo.updated_at));
					break;
				case "language":
					groups.add(repo.language || "Other");
					break;
				case "topics":
					repo.topics?.forEach((topic) => groups.add(topic));
					break;
			}
		});

		return Array.from(groups);
	});

	const toggleGroup = (group: string) => {
		if (selectedGroups.value.has(group)) {
			selectedGroups.value.delete(group);
		} else {
			selectedGroups.value.add(group);
		}
		selectedGroups.value = new Set(selectedGroups.value);
	};

	const clearFilters = () => {
		selectedGroups.value = new Set();
		searchQuery.value = "";
	};

	return {
		groupBy,
		searchQuery,
		selectedGroups,
		groupedRepos,
		availableGroups,
		toggleGroup,
		clearFilters,
	};
};
