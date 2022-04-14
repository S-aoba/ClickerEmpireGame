const config = {
	"initialPage": document.getElementById("initialPage"),
	"mainPage": document.getElementById("mainPage")
};

class User { }
class Items { }
class View {
	static createInitialPage() {
		config.initialPage.classList.add("h-full", "w-full");

		let container = document.createElement("div");
		container.classList.add("h-full", "w-full", "flex", "justify-center", "items-center", "bg-amber-400");

		container.innerHTML =
			`
				<div class="h-1/2 w-11/12  flex justify-center items-center 2xl:w-1/2">
					<div class="h-1/2 w-2/3  flex justify-center items-center">
						<div class="h-full w-full grid grid-rows-3">
							<div class="row-span-1 flex justify-center items-center">
								<p class="text-2xl sm:text-2xl md:text-3xl font-serif text-white">Have fun with the Clicker Empire Game</p>
							</div>
							<div class="row-span-2 flex justify-center">
								<div>
									<input id="input" class="py-2" type="text" placeholder="Enter your name" value="aoba">
									<div class="mt-8 flex justify-between">
										<button class="btn btn-success">NEW</button>
										<button class="btn btn-success">LOGIN</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			`
		return config.initialPage.append(container);
	}
};
class Controller {
	static startGame() {
		View.createInitialPage();
	}

};

Controller.startGame();