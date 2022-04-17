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

		if (userName == "aoba") return new User("aoba", 20, 0, 10000000, itemsList);
		return new User(userName, 20, 0, 50000, itemsList);
	}

	static moveInitialPageToMainPage(user) {
		config.initialPage.classList.add("hidden");
		config.mainPage.classList.add("h-full", "w-full", "flex", "justify-center", "items-center");
		config.mainPage.append(View.createMainPage(user));//MainPageの生成
		// Controller.startTimer(user);
	}

	static resetMainPage(user) {
		config.mainPage.innerHTML = "";
		config.mainPage.append(View.createMainPage(user));
	}

	static getTotalPrice(user, item, value) {
		let total = 0;
		total = Math.floor(item.price * value);
		return total;
	}

	// static startTimer(user) {
	// 	setInterval(function () {
	// 		user.days++;
	// 		user.money += user.incomePerSec;
	// 		if (user.days % 365 == 0) {
	// 			user.age++;
	// 			View.updateUserInfo(user);
	// 		} else {
	// 			View.updateUserInfo(user);
	// 		}
	// 	}, 1000)
	// }
}

Controller.startGame();