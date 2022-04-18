import { Items } from "./items.js";
import { User } from "./user.js";
import { View } from "./view.js";




export const config = {
	"initialPage": document.getElementById("initialPage"),
	"mainPage": document.getElementById("mainPage")
};


export class Controller {
	timer;

	static startGame() {
		View.createInitialPage();
		//newBtnをクリックした時の挙動
		let newBtn = config.initialPage.querySelectorAll("#newBtn")[0];
		newBtn.addEventListener("click", function () {
			let userName = config.initialPage.querySelectorAll("input")[0].value;//ユーザーネームの取得
			let user = Controller.createInitialAccount(userName);//ユーザーの生成
			Controller.moveInitialPageToMainPage(user);//initialPageからMainPageへの遷移
		})

		let loginBtn = config.initialPage.querySelectorAll("#loginBtn")[0];
		loginBtn.addEventListener("click", function () {
			let userName = config.initialPage.querySelectorAll("input")[0].value;
			let user = Controller.getUserData(userName);
			if (user == null) alert("ユーザー情報がありません。新規作成してください");
			Controller.moveInitialPageToMainPage(user);
		})
	}
	//ユーザーの生成
	static createInitialAccount(userName) {
		let itemsList = [
			new Items("Flip machine", "ability", 0, 500, 25, 0, 15000, "https://cdn.pixabay.com/photo/2019/06/30/20/09/grill-4308709_960_720.png"),
			new Items("ETF Stock", "investment", 0, -1, 0, 0.1, 300000, "https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png"),
			new Items("ETF Bonds", "investment", 0, -1, 0, 0.07, 300000, "https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png"),
			new Items("Lemonade Stand", "realState", 0, 1000, 30, 0, 30000, "https://cdn.pixabay.com/photo/2012/04/15/20/36/juice-35236_960_720.png"),
			new Items("Ice Cream Truck", "realState", 0, 500, 120, 0, 100000, "https://cdn.pixabay.com/photo/2020/01/30/12/37/ice-cream-4805333_960_720.png"),
			new Items("House", "realState", 0, 100, 32000, 0, 20000000, "https://cdn.pixabay.com/photo/2016/03/31/18/42/home-1294564_960_720.png"),
			new Items("TownHouse", "realState", 0, 100, 64000, 0, 40000000, "https://cdn.pixabay.com/photo/2019/06/15/22/30/modern-house-4276598_960_720.png"),
			new Items("Mansion", "realState", 0, 20, 500000, 0, 250000000, "https://cdn.pixabay.com/photo/2017/10/30/20/52/condominium-2903520_960_720.png"),
			new Items("Industrial Space", "realState", 0, 10, 2200000, 0, 1000000000, "https://cdn.pixabay.com/photo/2012/05/07/17/35/factory-48781_960_720.png"),
			new Items("Hotel Skyscraper", "realState", 0, 5, 25000000, 0, 10000000000, "https://cdn.pixabay.com/photo/2012/05/07/18/03/skyscrapers-48853_960_720.png"),
			new Items("Bullet-Speed Sky Railway", "realState", 0, 1, 30000000000, 0, 10000000000000, "https://cdn.pixabay.com/photo/2013/07/13/10/21/train-157027_960_720.png")
		];

		if (userName == "aoba") return new User("aoba", 20, 0, Math.pow(10, 9), itemsList);
		return new User(userName, 20, 0, 50000, itemsList);
	}

	static moveInitialPageToMainPage(user) {
		config.initialPage.classList.add("hidden");
		config.mainPage.classList.add("h-full", "w-full", "flex", "justify-center", "items-center");
		config.mainPage.append(View.createMainPage(user));//MainPageの生成
		Controller.startTimer(user);
	}

	static getTotalPrice(item, amount) {
		let total = 0;
		amount = Number(amount);
		if (item.name == "ETF Stock") {
			for (let i = 0; i < amount; i++) {
				total += parseInt(item.price * Math.pow(1 + item.perRate, amount));
			}
			return total;
		} else if (amount > 0 && amount % 1 == 0) return total += item.price * amount;
		else return total;

	}

	static updateByClickBurger(user) {
		user.clickCount++;
		user.money += user.incomePerClick;
		View.updateBurgerPage(user);
		View.updateUserInfo(user);
	}

	static updatePurchaseItems(user, index, amount) {
		if (amount < 0 || amount % 1 != 0) alert("入力された数値が正しくありません。もう一度数値を入力してください");
		else if (Controller.getTotalPrice(user.items[index], amount) > user.money) alert("所持金が足りません");
		else if (user.items[index].currentAmount + amount > user.items[index].maxAmount && user.items[index].type != "investment") alert("最大購入可能数を超えています");
		else {
			user.money -= Controller.getTotalPrice(user.items[index], amount);
			user.items[index].currentAmount += Number(amount);
			if (user.items[index].name == "ETF Stock") {
				user.stock += Controller.getTotalPrice(user.items[index], amount);
				user.items[index].price = Controller.calculateETFStockPrice(user.items[index], amount);
				Controller.updateUserIncome(user, user.items[index], amount);
			} else if (user.items[index].name == "ETF Bonds") {
				user.stock += Controller.getTotalPrice(user.items[index], amount);
				Controller.updateUserIncome(user, user.items[index], amount);
			} else Controller.updateUserIncome(user, user.items[index], amount);
		}
	}

	static updateUserIncome(user, item, amount) {
		amount = Number(amount);
		if (item.type == "ability") {
			user.incomePerClick += item.perMoney * amount;
		} else if (item.type == "investment") {
			user.incomePerSec += user.stock * item.perRate;
		} else if (item.type == "realState") {
			user.incomePerSec += item.perMoney * amount;
		}
	}

	static calculateETFStockPrice(item, amount) {
		return parseInt(item.price * Math.pow(1 + item.perRate, amount));
	}

	static startTimer(user) {
		Controller.timer = setInterval(function () {
			user.days++;
			user.money += user.incomePerSec;
			if (user.days % 365 == 0) {
				user.age++;
				View.updateUserInfo(user);
			} else {
				View.updateUserInfo(user);
			}
		}, 1000)
	}

	static stopTimer() {
		clearInterval(Controller.timer);
	}

	static resetAllData(user) {
		if (window.confirm("本当にリセットしますか？")) {
			let userName = user.name;
			user = Controller.createInitialAccount(userName);
			Controller.stopTimer();
			View.updateMainPage(user);
			Controller.startTimer(user);
		}
	}

	static saveUserData(user) {
		localStorage.setItem(user.name, JSON.stringify(user));
		alert("保存しました。再度ログインする場合は、同じユーザーネームを使用してください");
	}

	static getUserData(userName) {
		return JSON.parse(localStorage.getItem(userName));
	}

	static initializePage() {
		config.initialPage.classList.remove("hidden");
		config.initialPage.innerHTML = "";
		config.mainPage.innerHTML = "";
		Controller.startGame();
	}
}

Controller.startGame();