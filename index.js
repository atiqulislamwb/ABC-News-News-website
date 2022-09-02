console.log("hwlloe");

const loadCategory = async () => {
  const url = "https://openapi.programming-hero.com/api/news/categories";
  try {
    const response = await fetch(url);
    const category = await response.json();
    displayCategories(category?.data?.news_category);
  } catch (error) {
    console.log(error);
  }
};

const displayCategories = async (categories) => {
  const mainDiv = document.getElementById("category");
  for (const category of categories) {
    const div = document.createElement("div");
    div.innerHTML = `
           <div class="text-black text-gray-500 text-xl p-2 hover:bg-red-100 hover:rounded-md" onclick="loadNews('${category.category_id}')">
             ${category.category_name}
           </div>
          `;
    mainDiv.appendChild(div);
  }
};

const loadNews = async (id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  try {
    const response = await fetch(url);
    const news = await response.json();
    displayNews(news?.data);
  } catch (error) {
    console.log(error);
  }
};

const displayNews = async (news) => {
  console.log(news);
};

const toggleSpinner = (isLoading) => {
  const spinner = document.getElementById("spinner");
  if (isLoading) {
    spinner.classList.remove("hidden");
  } else {
    spinner.classList.add("hidden");
  }
};

loadCategory();
