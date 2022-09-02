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
  const mainDiv = document.getElementById("show-news");
  mainDiv.innerHTML = ``;
  news.forEach((newsItem) => {
    const div = document.createElement("div");

    div.innerHTML = `


      <div class=" sm:flex shadow-xl m-8 h-auto p-3 bg-white ">
      <div class="">
     <img src=${
       newsItem.thumbnail_url
     } class="p-4 w-[320px]  object-contain" alt="something"/>
      </div>
      
      <div class="">
            <p class="text-[18px] font-semibold text-black mt-5">${
              newsItem.title
            }</p>
            <p class="text-[15px]  text-gray-500 mt-5">${newsItem.details.substr(
              0,
              200
            )}</p>

            <p class="text-[15px] text-gray-500 mt-5">${newsItem.details.substr(
              330,
              450
            )}...</p>
           <div class="flex mt-4 justify-between p-3">

               <div class="flex">
               <img class="w-10 h-10 object-cover rounded-full" src=${
                 newsItem?.author?.img
               } />
               <div class="ml-2 ">
                  <p class="text-black font-semibold ">${
                    newsItem?.author?.name ? newsItem.author?.name : "No Author"
                  }</p>
                  <p class="text-gray-500 font-semibold">${
                    newsItem?.author?.published_date
                  }</p>
               </div>
               </div>

               <div class="flex p-2 ">
                   <p class="mr-2"><i class="fa-solid fa-face-grin-wide"></i></p>
                   <p class="font-bold text-black">${
                     newsItem?.total_view
                       ? `${newsItem?.total_view}M`
                       : "No View"
                   } </p>
               </div>

                 <div class="flex  p-2 ">
                   <span class="text-slate-700 mr-2">Rating</span>
                   <span class="font-bold text-black">${
                     newsItem?.rating?.number
                   } </span>
               </div>
               
               <div class="flex">
               <button type="button" class="text-red-500 text-xl" >
               <i class="fa-solid fa-arrow-right"></i>
               </button>
               
               </div>
           

             </div>


      </div>
    </div>
      `;
    mainDiv.appendChild(div);
  });
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
