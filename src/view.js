import { Controller } from "./main.js";
import { config } from "./main.js";




export class View {
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
							<input type="text" placeholder="Enter your name" value="aoba11">
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
						<div id="userInfo" class="row-span-1"></div>
						<div id="purchaseList" class="h-1/2 row-span-5 px-3 py-3"></div>
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
		container.classList.add("h-37rem", "desktop:h-60rem", "w-full", "pt-3", "px-3", "border-4", "rounded-lg", "border-red-500", "overflow-auto", "item-frame");
		for (let i = 0; i < user.items.length; i++) {
			container.innerHTML +=
				`
				<div
					class="h-1/5 w-full mb-3 border-4 rounded-lg border-red-500 grid grid-cols-3 text-red-500 itemsList">
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
								<p class="text-xl">￥${user.items[i].perMoney} / sec</p>
							</div>
						</div>
					</div>
				</div>
			`
		}

		let itemsList = container.querySelectorAll(".itemsList");
		for (let i = 0; i < user.items.length; i++) {
			itemsList[i].addEventListener("click", function () {
				View.createPurchaseItemPage(user, i)
			})
		}

		return container;
	}

	static createPurchaseItemPage(user, index) {
		let container = document.createElement("div");
		let purchaseItemFrame = config.mainPage.querySelectorAll(".item-frame")[0];
		purchaseItemFrame.innerHTML = "";

		container.classList.add("h-1/1", "w-full", "px-3", "pt-3", "border", "rounded-lg", "border-red-500", "grid", "grid-rows-2")
		container.innerHTML =
			`
				<div class="row-span-1  grid grid-cols-4">
					<div class="col-span-3">
						<div class="my-6 mx-4">
							<p class="text-5xl font-light">${user.items[index].name}</p>
							<p class="text-2xl font-light">Max Purchases: ${View.displayMaxAmount(user.items[index])}</p>
							<p class="text-2xl font-light">Price: ￥${user.items[index].price}</p>
							<p class="text-2xl font-light">Get: ￥${user.items[index].perMoney} extra per second</p>
						</div>
					</div>
					<div class="col-span-1 text-center">
						<img src="${user.items[index].url}" alt=""
							width="300px">
					</div>
				</div>
				<div class="row-span-1 grid grid-rows-2 ">
					<div class="row-span-1 flex justify-center items-center">
						<div class="w-full text-2xl pr-2 pl-2">
							<div class="w-full font-light">
								<label for="purchaseNum">How many would you like to purchase?</label>
								<div class="w-full text-right">
									<input class="w-full text-right" type="number" name="purchaseNum" placeholder="0" min="0" max="${user.items[index].maxAmount}">
									<p class="total">Total: ￥0</p>
								</div>
							</div>
						</div>
					</div>
					<div class="row-span-1 flex justify-center items-center">
						<div class="h-1/1 w-11/12 grid grid-cols-2 gap-2">
							<div class="col-span-1 flex justify-center items-center">
								<button id="back" class="h-3/5 w-full btn">Go Back</button>
							</div>
							<div class="col-span-1 flex justify-center items-center">
								<button id="purchaseBtn" class="h-3/5 w-full btn btn-primary">Purchase</button>
							</div>
						</div>
					</div>
				</div>
			`

		//totalの表示
		let input = container.querySelectorAll("input")[0];
		input.addEventListener("change", function () {
			let inputAmount = input.value;
			let total = Controller.getTotalPrice(user, user.items[index], inputAmount);
			container.querySelectorAll(".total")[0].innerHTML = `Total: ￥${total}`;
		})



		//戻るボタンを押した時の挙動
		let backBtn = container.querySelectorAll("#back")[0];
		backBtn.addEventListener("click", function () {
			Controller.resetMainPage(user);
		})
		return purchaseItemFrame.append(container);
	}

	static displayMaxAmount(item) {
		if (item.maxAmount == -1) return "∞";
		return item.maxAmount;
	}


}