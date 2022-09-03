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
  const submainDiv = document.getElementById("sub-information");

  categories.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
           <button class=" text-black text-gray-500 text-xl p-2 hover:bg-red-100 hover:rounded-md" onclick="loadNews('${category.category_id}')">
             ${category?.category_name}
           </button>
          `;
    mainDiv.appendChild(div);
  });
};

const loadNews = async (id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  toggleSpinner(true);
  try {
    const response = await fetch(url);
    const news = await response.json();
    displayNews(news?.data);
  } catch (error) {
    console.log(error);
  }
};

const displayNews = async (news) => {
  const mainDiv = document.getElementById("show-news");
  const submainDiv = document.getElementById("sub-information");
  console.log(news);
  mainDiv.innerHTML = ``;
  submainDiv.innerHTML = `
    <p class="font-semibold text-slate-800 bg-white p-2 mb-4 sm:mb-10">${news.length} news found category </p>
    <div class="flex gap-3 flex-wrap items-center justify-center sm:flex sm:items-center sm:justify-between bg-gray-100">
    <div class="flex ">
       <p class="p-2  text-lg text-black font-semibold">Sort By View</p>
       <p  class="p-2 bg- text-lg text-slate-400 font-semibold bg-white rounded-md px-2">Default <span class="ml-4"><i class="fa-solid fa-arrow-down-long"></i></span></p>
    </div>
    <div>
      <button class="bg-red-500 text-white text-lg p-2 rounded-md mr-3">Today's Pick</button>
      <button class="text-red-500 border border-red-500   text-lg p-2 rounded-md mr-3">Trending</button>
    </div>
</div>

  
    `;

  const noNews = document.getElementById("no-news-found");

  //No found message
  if (news.length === 0) {
    noNews.classList.remove("hidden");
    submainDiv.classList.add("hidden");
    toggleSpinner(false);
  } else {
    noNews.classList.add("hidden");
    submainDiv.classList.remove("hidden");
  }

  news.forEach((newsItem) => {
    const div = document.createElement("div");

    div.innerHTML = `


      <div class=" sm:flex shadow-xl m-8 h-auto p-3 bg-white ">
      <div class="">
     <img src=${
       newsItem?.thumbnail_url ? newsItem?.thumbnail_url : "No News Image"
     } class="p-4 w-[320px]  object-contain" alt="something"/>
      </div>
      
      <div class="">
            <p class="text-[18px] font-semibold text-black mt-5">${
              newsItem?.title
            }</p>
            <p class="text-[15px]  text-gray-500 mt-5">${newsItem?.details?.substr(
              0,
              200
            )}</p>

            <p class="text-[15px] text-gray-500 mt-5">${newsItem?.details?.substr(
              330,
              450
            )}...</p>
           <div class="flex flex-wrap  sm:flex mt-4 justify-between p-3">

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
                      ? newsItem?.author?.published_date
                      : "No Published Date"
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
               <a href="#my-modal-2"   class="hover:bg-red-200 text-red-500 text-xl mt-3 p-3 rounded-full sm:mt-2"
                onclick="loadModalNews('${newsItem?._id}')"
               >
               <i class="fa-solid fa-arrow-right"></i>
               </a>
                



               </div>
           

             </div>


      </div>
    </div>
      `;
    mainDiv.appendChild(div);
    toggleSpinner(false);
  });
};

const loadModalNews = async (id) => {
  const url = `https://openapi.programming-hero.com/api/news/${id}`;
  try {
    const response = await fetch(url);
    const news = await response.json();
    newsDetails(news?.data[0]);
  } catch (error) {
    console.log(error);
  }
};

const newsDetails = (news) => {
  toggleSpinner(true);
  const mainDiv = document.getElementById("modal-body");
  mainDiv.innerHTML = `
     <div class="overflow-auto ">
     <img class="w-full " src=${news.image_url} alt="newsimage" />
     <div>
     <p class="text-[18px] font-semibold text-black mt-5">${news?.title}</p>
      <p class="text-[15px]  text-gray-500 mt-5">Description ${
        news?.details
      }</p>

    
     </div>  
     <div class="flex mt-4 justify-between p-3">

     <div class="flex">
     <img class="w-10 h-10 object-cover rounded-full" src=${
       news?.author?.img
     } />
     <div class="ml-2 ">
        <p class="text-black font-semibold ">${
          news?.author?.name ? news.author?.name : "No Author"
        }</p>
        <p class="text-gray-500 font-semibold">${
          news?.author?.published_date
        }</p>
     </div>
     </div>

     <div class="flex p-2 ">
         <p class="mr-2"><i class="fa-solid fa-face-grin-wide"></i></p>
         <p class="font-bold text-black">${
           news?.total_view ? `${news?.total_view}M` : "No View"
         } </p>
     </div>

       <div class="flex  p-2 ">
         <span class="text-slate-700 mr-2">Rating</span>
         <span class="font-bold text-black">${news?.rating?.number} </span>
     </div>
     
     
    
      



     </div>
 

   </div>

   </div>
   <div class="modal-action">
   <a href="#" class="btn">Close</a>
 </div>
     `;
  toggleSpinner(false);
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
