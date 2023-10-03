export const displayJobSkills = (limit, jobSkills) => {
	return jobSkills.map((skill, index) => {
		if (limit === true) {
			if (index <= 3) {
				return (
					<span className="px-2 text-black-50" key={skill.Skill_Id}>
						{skill.Skill.Skill_Name}
					</span>
				);
			}
		} else {
			return (
				<span className="px-2 text-black-50" key={skill.Skill_Id}>
					{skill.Skill.Skill_Name}
				</span>
			);
		}
		return null; // Return null for items that don't meet the condition
	});
};
