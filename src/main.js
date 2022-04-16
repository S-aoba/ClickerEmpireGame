const config = {
	"initialPage": document.getElementById("initialPage"),
	"mainPage": document.getElementById("mainPage")
};

class User {
	constructor(name, age, days, money, items) {
		this.name = name;
		this.age = age;
		this.days = days;
		this.money = money;
		this.clickCount = 0;//ハンバーガーをクリックした回数
		this.incomePerClick = 25;//一回ハンバーガーをクリックしたら取得できる金額
		this.incomePerSec = 0;//itemの中で一秒間に自動的に取得できる金額
		this.stock = 0;//ETFを買った場合の取得できるストック
		this.items = items;
	}
}
class Items {
	constructor(name, type, currentAmount, maxAmount, perMoney, perRate, price, url) {
		this.name = name;
		this.type = type;
		this.currentAmount = currentAmount;
		this.maxAmount = maxAmount;
		this.perMoney = perMoney;
		this.perRate = perRate;
		this.price = price;
		this.url = url;
	}
}
class View {
	static createInitialPage() {
		let container = document.createElement("div");
		container.classList.add("h-1/1", "w-9/12", "bg-amber-400", "flex", "justify-center", "items-center");
		config.initialPage.classList.add("h-full", "w-full", "flex", "justify-center", "items-center")
		container.innerHTML =
			`
			<div>
				<div class="my-5 w-full text-center text-3xl font-light">
					<p>Have fun the ClickerEmpireGame</p>
				</div>
						<div class="flex justify-center">
								<div class="py-5 w-1/2 ">
						<div class="py-5 text-center">
							<input type="text" placeholder="Enter your name" value="aoba">
						</div>
						<div class="flex justify-around">
							<button id="newBtn" class="btn btn-success hover:text-white">NEW</button>
							<button id="loginBtn" class="btn btn-success hover:text-white">LOGIN</button>
						</div>
					</div>
				</div>
			</div>
			`
		return config.initialPage.append(container);
	}

	static createMainPage(user) {
		let container = document.createElement("div");
		container.classList.add("h-1/1", "w-11/12", "bg-amber-300", "grid", "grid-cols-2");

		container.innerHTML =
			`
				<div class="col-span-1 ">
					<div id="burgerStatus" class="h-full"></div>
				</div>
				<div class="col-span-1 bg-amber-300">
					<div class="h-full grid grid-rows-6">
						<div id="userInfo" class="row-span-1">

						</div>
						<div id="purchaseList" class="h-1/2 row-span-5 px-3 py-3">

						</div>
					</div>
				</div>
			`

		container.querySelectorAll("#burgerStatus")[0].append(View.createBurgerStatus(user));
		container.querySelectorAll("#userInfo")[0].append(View.createUserInfo(user));
		container.querySelectorAll("#purchaseList")[0].append(View.createPurchaseList(user));


		return container;

	}

	static createBurgerStatus(user) {
		let container = document.createElement("div");
		container.classList.add("h-full", "grid", "grid-rows-6");
		container.innerHTML =
			`
				<div class="row-span-1 flex justify-center items-center">
					<div>
						<div class="text-center font-light text-red-500">
							<p class="text-7xl">${user.clickCount} Burger</p>
							<p class="text-2xl">one Click: ￥${user.incomePerClick}</p>
						</div>
					</div>
				</div>
				<div class="row-span-5 flex justify-center items-center">
					<div class="h-1/2 w-1/2">
						<img src="https://cdn.pixabay.com/photo/2014/04/02/17/00/burger-307648_960_720.png" id="burger">
					</div>
				</div>
			`
		let burgerClick = container.querySelectorAll("#burger")[0];
		burgerClick.addEventListener("click", function () {
			Controller.updateByBurgerClick(user);
		})

		return container;
	}

	static createUserInfo(user) {
		let container = document.createElement("div");
		container.classList.add("h-full", "grid", "grid-cols-2", "text-4xl", "font-light");
		container.innerHTML =
			`
				<div class="text-center text-red-500 flex justify-center items-center">
					<p>${user.name}</p>
				</div>
				<div class="text-center text-red-500 flex justify-center items-center">
					<p>${user.age} yrs old</p>
				</div>
				<div class="text-center text-red-500 flex justify-center items-center">
					<p>${user.days} days</p>
				</div>
				<div class="text-center text-red-500 flex justify-center items-center">
					<p>￥${user.money}</p>
				</div>
			`
		return container;
	}

	static createPurchaseList(user) {
		let container = document.createElement("div");
		container.classList.add("h-37rem", "desktop:h-60rem", "w-full", "pt-3", "px-3", "border-4", "rounded-lg", "border-red-500", "overflow-auto");
		for (let i = 0; i < user.items.length; i++) {
			container.innerHTML +=
				`
				<div
					class="h-1/5 w-full mb-3 border-4 rounded-lg border-red-500 grid grid-cols-3 text-red-500">
					<div class="col-span-1 flex justify-center">
						<img src="${user.items[i].url}"
							alt="" width="80px">
					</div>
					<div class="col-span-1 ">
						<div class="h-full flex justify-center items-center">
							<div class="text-center">
								<p class="text-3xl">${user.items[i].name}</p>
								<p class="text-xl">￥${user.items[i].price}</p>
							</div>
						</div>
					</div>
					<div class="col-span-1">
						<div class="h-full flex justify-center items-center">
							<div class="text-center">
								<p class="text-3xl">${user.items[i].currentAmount}</p>
								<p class="text-xl">￥${user.items[i].incomePerSec} / sec</p>
							</div>
						</div>
					</div>
				</div>
			`
		}
		return container;
	}

	static updateByBurgerPage(user) {
		let burgerStatus = config.mainPage.querySelectorAll("#burgerStatus")[0];
		burgerStatus.innerHTML = "";
		burgerStatus.append(View.createBurgerStatus(user));
	}

	static updateUserInfo(user) {
		let userInfo = config.mainPage.querySelectorAll("#userInfo")[0];
		userInfo.innerHTML = "";
		userInfo.append(View.createUserInfo(user));
	}
}

class Controller {
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
		return config.mainPage.append(View.createMainPage(user));//MainPageの生成
	}

	static updateByBurgerClick(user) {
		user.clickCount++;
		user.money += user.incomePerClick;
		View.updateByBurgerPage(user);
		View.updateUserInfo(user);
	}
}

Controller.startGame();