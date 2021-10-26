export { getData, setData };

const getData = (drinkType) => {
	const loadMenuTemplate = localStorage.getItem(drinkType);
	if (loadMenuTemplate != null) {
		const parsedMenuTemplate = Json.parse(loadMenuTemplate);
		return parsedMenuTemplate;
	}
	return null;
};

const setData = (drinkType, data) => {
	localStorage.setItem(drinkType, JSON.stringify(data));
};
