export class User {
	constructor(name, age, days, money, items) {
		this.name = name;
		this.age = age;
		this.days = days;
		this.money = money;
		this.clickCount = 0;//ハンバーガーをクリックした回数
		this.incomePerClick = 25;//一回ハンバーガーをクリックしたら取得できる金額
		this.incomePerSec = 0;//itemの中で一秒間に自動的に取得できる金額
		this.stock = 0;
		this.items = items;
	}
}