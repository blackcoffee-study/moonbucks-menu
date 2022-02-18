export class Category {
	constructor(koreanName, englishName, symbol) {
		this.koreanName = koreanName;
		this.englishName = englishName;
		this.symbol = symbol;
	}
	getKoreanName() {
		return this.koreanName;
	}
	getEnglishName() {
		return this.englishName;
	}
	getSymbol() {
		return this.symbol;
	}
}