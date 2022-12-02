<template>
  <div
    class="vh-100 w-100 bg-light d-flex justify-content-center align-items-center flex-column"
  >
    <h3 class="text-center mb-5 fw-bold">Search Multi Select Component</h3>
    <div class="card card-flush w-25" style="min-height: 500px">
      <div class="card-body h-100">
        <div>
          <input
            type="text"
            class="form-control form-control-white text-center fw-light"
            placeholder="Search For Something?!"
            v-model="inputText"
            @input="searchHandler"
          />
        </div>
        <div class="mt-3 h-100" style="min-height: 400px">
          <div v-if="resultsLoading" style="min-height: 400px" class="d-flex justify-content-center align-items-center">
            <img src="@/assets/loading-state.gif" width="200">
          </div>
          <div v-else-if="!resultsLoading && results.length > 0 && inputText" style="max-height: 400px; overflow-y: auto">
            <div v-for="result in results" :key="result.id">
              <div
                @click="selectItem(result)"
                class="px-2 py-3 rounded my-1 title-section"
                :class="{'selected-item shadow-sm': selectedItemsArray.includes(result)}"
              >
                {{ result.title }}
              </div>
            </div>
          </div>
          <div
            v-else-if="!resultsLoading || (results.length === 0 && !inputText)"
            class="card-body d-flex justify-content-center align-items-center flex-column w-100 h-100"
            style="min-height: 300px"
          >
            <div
              class="image mb-5 rounded-circle overflow-hidden shadow-lg"
              style="width: 160px; height: 160px"
            >
              <img
                src="https://cdn.dribbble.com/users/532338/screenshots/15860755/media/05fc77d5ceb705e98a7c49fd88318143.png?compress=1&resize=1000x750&vertical=top"
                class="w-100 h-100"
                style="object-fit: cover"
              />
            </div>
            <p class="mt-5 h3 fw-light text-center">
              No Results. Try to search for something
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "@vue/reactivity";

const data = reactive([
  {
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    selected: false,
  },
  {
    userId: 1,
    id: 2,
    title: "quis ut nam facilis et officia qui",
    selected: false,
  },
  {
    userId: 1,
    id: 3,
    title: "fugiat veniam minus",
    selected: false,
  },
  {
    userId: 1,
    id: 4,
    title: "et porro tempora",
    selected: false,
  },
  {
    userId: 1,
    id: 5,
    title: "laboriosam mollitia et enim quasi adipisci quia provident illum",
    selected: false,
  },
  {
    userId: 1,
    id: 6,
    title: "qui ullam ratione quibusdam voluptatem quia omnis",
    selected: false,
  },
  {
    userId: 1,
    id: 7,
    title: "illo expedita consequatur quia in",
    selected: false,
  },
  {
    userId: 1,
    id: 8,
    title: "quo adipisci enim quam ut ab",
    selected: false,
  },
  {
    userId: 1,
    id: 9,
    title: "molestiae perspiciatis ipsa",
    selected: false,
  },
  {
    userId: 1,
    id: 10,
    title: "illo est ratione doloremque quia maiores aut",
    selected: false,
  },
  {
    userId: 1,
    id: 11,
    title: "vero rerum temporibus dolor",
    selected: false,
  },
  {
    userId: 1,
    id: 12,
    title: "ipsa repellendus fugit nisi",
    selected: false,
  },
  {
    userId: 1,
    id: 13,
    title: "et doloremque nulla",
    selected: false,
  },
  {
    userId: 1,
    id: 14,
    title: "repellendus sunt dolores architecto voluptatum",
    selected: false,
  },
  {
    userId: 1,
    id: 15,
    title: "ab voluptatum amet voluptas",
    selected: false,
  },
  {
    userId: 1,
    id: 16,
    title: "accusamus eos facilis sint et aut voluptatem",
    selected: false,
  },
  {
    userId: 1,
    id: 17,
    title: "quo laboriosam deleniti aut qui",
    selected: false,
  },
  {
    userId: 1,
    id: 18,
    title: "dolorum est consequatur ea mollitia in culpa",
    selected: false,
  },
  {
    userId: 1,
    id: 19,
    title: "molestiae ipsa aut voluptatibus pariatur dolor nihil",
    selected: false,
  },
  {
    userId: 1,
    id: 20,
    title: "ullam nobis libero sapiente ad optio sint",
    selected: false,
  },
  {
    userId: 2,
    id: 21,
    title: "suscipit repellat esse quibusdam voluptatem incidunt",
    selected: false,
  },
  {
    userId: 2,
    id: 22,
    title: "distinctio vitae autem nihil ut molestias quo",
    selected: false,
  },
  {
    userId: 2,
    id: 23,
    title: "et itaque necessitatibus maxime molestiae qui quas velit",
    selected: false,
  },
  {
    userId: 2,
    id: 24,
    title: "adipisci non ad dicta qui amet quaerat doloribus ea",
    selected: false,
  },
  {
    userId: 2,
    id: 25,
    title: "voluptas quo tenetur perspiciatis explicabo natus",
    selected: false,
  },
  {
    userId: 2,
    id: 26,
    title: "aliquam aut quasi",
    selected: false,
  },
  {
    userId: 2,
    id: 27,
    title: "veritatis pariatur delectus",
    selected: false,
  },
  {
    userId: 2,
    id: 28,
    title: "nesciunt totam sit blanditiis sit",
    selected: false,
  },
  {
    userId: 2,
    id: 29,
    title: "laborum aut in quam",
    selected: false,
  },
  {
    userId: 2,
    id: 30,
    title:
      "nemo perspiciatis repellat ut dolor libero commodi blanditiis omnis",
    selected: false,
  },
  {
    userId: 2,
    id: 31,
    title: "repudiandae totam in est sint facere fuga",
    selected: false,
  },
  {
    userId: 2,
    id: 32,
    title: "earum doloribus ea doloremque quis",
    selected: false,
  },
  {
    userId: 2,
    id: 33,
    title: "sint sit aut vero",
    selected: false,
  },
  {
    userId: 2,
    id: 34,
    title: "porro aut necessitatibus eaque distinctio",
    selected: false,
  },
  {
    userId: 2,
    id: 35,
    title: "repellendus veritatis molestias dicta incidunt",
    selected: false,
  },
  {
    userId: 2,
    id: 36,
    title: "excepturi deleniti adipisci voluptatem et neque optio illum ad",
    selected: false,
  },
  {
    userId: 2,
    id: 37,
    title: "sunt cum tempora",
    selected: false,
  },
  {
    userId: 2,
    id: 38,
    title: "totam quia non",
    selected: false,
  },
  {
    userId: 2,
    id: 39,
    title: "doloremque quibusdam asperiores libero corrupti illum qui omnis",
    selected: false,
  },
  {
    userId: 2,
    id: 40,
    title: "totam atque quo nesciunt",
    selected: false,
  },
  {
    userId: 3,
    id: 41,
    title:
      "aliquid amet impedit consequatur aspernatur placeat eaque fugiat suscipit",
    selected: false,
  },
  {
    userId: 3,
    id: 42,
    title: "rerum perferendis error quia ut eveniet",
    selected: false,
  },
  {
    userId: 3,
    id: 43,
    title: "tempore ut sint quis recusandae",
    selected: false,
  },
  {
    userId: 3,
    id: 44,
    title: "cum debitis quis accusamus doloremque ipsa natus sapiente omnis",
    selected: false,
  },
  {
    userId: 3,
    id: 45,
    title: "velit soluta adipisci molestias reiciendis harum",
    selected: false,
  },
  {
    userId: 3,
    id: 46,
    title: "vel voluptatem repellat nihil placeat corporis",
    selected: false,
  },
  {
    userId: 3,
    id: 47,
    title: "nam qui rerum fugiat accusamus",
    selected: false,
  },
  {
    userId: 3,
    id: 48,
    title: "sit reprehenderit omnis quia",
    selected: false,
  },
  {
    userId: 3,
    id: 49,
    title: "ut necessitatibus aut maiores debitis officia blanditiis velit et",
    selected: false,
  },
  {
    userId: 3,
    id: 50,
    title: "cupiditate necessitatibus ullam aut quis dolor voluptate",
    selected: false,
  },
  {
    userId: 3,
    id: 51,
    title: "distinctio exercitationem ab doloribus",
    selected: false,
  },
  {
    userId: 3,
    id: 52,
    title: "nesciunt dolorum quis recusandae ad pariatur ratione",
    selected: false,
  },
  {
    userId: 3,
    id: 53,
    title: "qui labore est occaecati recusandae aliquid quam",
    selected: false,
  },
  {
    userId: 3,
    id: 54,
    title: "quis et est ut voluptate quam dolor",
    selected: false,
  },
  {
    userId: 3,
    id: 55,
    title:
      "voluptatum omnis minima qui occaecati provident nulla voluptatem ratione",
    selected: false,
  },
  {
    userId: 3,
    id: 56,
    title: "deleniti ea temporibus enim",
    selected: false,
  },
  {
    userId: 3,
    id: 57,
    title: "pariatur et magnam ea doloribus similique voluptatem rerum quia",
    selected: false,
  },
  {
    userId: 3,
    id: 58,
    title: "est dicta totam qui explicabo doloribus qui dignissimos",
    selected: false,
  },
  {
    userId: 3,
    id: 59,
    title: "perspiciatis velit id laborum placeat iusto et aliquam odio",
    selected: false,
  },
  {
    userId: 3,
    id: 60,
    title: "et sequi qui architecto ut adipisci",
    selected: false,
  },
  {
    userId: 4,
    id: 61,
    title: "odit optio omnis qui sunt",
    selected: false,
  },
  {
    userId: 4,
    id: 62,
    title: "et placeat et tempore aspernatur sint numquam",
    selected: false,
  },
  {
    userId: 4,
    id: 63,
    title: "doloremque aut dolores quidem fuga qui nulla",
    selected: false,
  },
  {
    userId: 4,
    id: 64,
    title: "voluptas consequatur qui ut quia magnam nemo esse",
    selected: false,
  },
  {
    userId: 4,
    id: 65,
    title: "fugiat pariatur ratione ut asperiores necessitatibus magni",
    selected: false,
  },
  {
    userId: 4,
    id: 66,
    title: "rerum eum molestias autem voluptatum sit optio",
    selected: false,
  },
  {
    userId: 4,
    id: 67,
    title: "quia voluptatibus voluptatem quos similique maiores repellat",
    selected: false,
  },
  {
    userId: 4,
    id: 68,
    title: "aut id perspiciatis voluptatem iusto",
    selected: false,
  },
  {
    userId: 4,
    id: 69,
    title:
      "doloribus sint dolorum ab adipisci itaque dignissimos aliquam suscipit",
    selected: false,
  },
  {
    userId: 4,
    id: 70,
    title: "ut sequi accusantium et mollitia delectus sunt",
    selected: false,
  },
  {
    userId: 4,
    id: 71,
    title: "aut velit saepe ullam",
    selected: false,
  },
  {
    userId: 4,
    id: 72,
    title: "praesentium facilis facere quis harum voluptatibus voluptatem eum",
    selected: false,
  },
  {
    userId: 4,
    id: 73,
    title: "sint amet quia totam corporis qui exercitationem commodi",
    selected: false,
  },
  {
    userId: 4,
    id: 74,
    title: "expedita tempore nobis eveniet laborum maiores",
    selected: false,
  },
  {
    userId: 4,
    id: 75,
    title: "occaecati adipisci est possimus totam",
    selected: false,
  },
  {
    userId: 4,
    id: 76,
    title: "sequi dolorem sed",
    selected: false,
  },
  {
    userId: 4,
    id: 77,
    title:
      "maiores aut nesciunt delectus exercitationem vel assumenda eligendi at",
    selected: false,
  },
  {
    userId: 4,
    id: 78,
    title: "reiciendis est magnam amet nemo iste recusandae impedit quaerat",
    selected: false,
  },
  {
    userId: 4,
    id: 79,
    title: "eum ipsa maxime ut",
    selected: false,
  },
  {
    userId: 4,
    id: 80,
    title: "tempore molestias dolores rerum sequi voluptates ipsum consequatur",
    selected: false,
  },
  {
    userId: 5,
    id: 81,
    title: "suscipit qui totam",
    selected: false,
  },
  {
    userId: 5,
    id: 82,
    title: "voluptates eum voluptas et dicta",
    selected: false,
  },
  {
    userId: 5,
    id: 83,
    title: "quidem at rerum quis ex aut sit quam",
    selected: false,
  },
  {
    userId: 5,
    id: 84,
    title: "sunt veritatis ut voluptate",
    selected: false,
  },
  {
    userId: 5,
    id: 85,
    title: "et quia ad iste a",
    selected: false,
  },
  {
    userId: 5,
    id: 86,
    title: "incidunt ut saepe autem",
    selected: false,
  },
  {
    userId: 5,
    id: 87,
    title: "laudantium quae eligendi consequatur quia et vero autem",
    selected: false,
  },
  {
    userId: 5,
    id: 88,
    title: "vitae aut excepturi laboriosam sint aliquam et et accusantium",
    selected: false,
  },
  {
    userId: 5,
    id: 89,
    title: "sequi ut omnis et",
    selected: false,
  },
  {
    userId: 5,
    id: 90,
    title: "molestiae nisi accusantium tenetur dolorem et",
    selected: false,
  },
  {
    userId: 5,
    id: 91,
    title: "nulla quis consequatur saepe qui id expedita",
    selected: false,
  },
  {
    userId: 5,
    id: 92,
    title: "in omnis laboriosam",
    selected: false,
  },
  {
    userId: 5,
    id: 93,
    title: "odio iure consequatur molestiae quibusdam necessitatibus quia sint",
    selected: false,
  },
  {
    userId: 5,
    id: 94,
    title: "facilis modi saepe mollitia",
    selected: false,
  },
  {
    userId: 5,
    id: 95,
    title: "vel nihil et molestiae iusto assumenda nemo quo ut",
    selected: false,
  },
  {
    userId: 5,
    id: 96,
    title: "nobis suscipit ducimus enim asperiores voluptas",
    selected: false,
  },
  {
    userId: 5,
    id: 97,
    title: "dolorum laboriosam eos qui iure aliquam",
    selected: false,
  },
  {
    userId: 5,
    id: 98,
    title:
      "debitis accusantium ut quo facilis nihil quis sapiente necessitatibus",
    selected: false,
  },
  {
    userId: 5,
    id: 99,
    title: "neque voluptates ratione",
    selected: false,
  },
  {
    userId: 5,
    id: 100,
    title: "excepturi a et neque qui expedita vel voluptate",
    selected: false,
  },
  {
    userId: 6,
    id: 101,
    title: "explicabo enim cumque porro aperiam occaecati minima",
    selected: false,
  },
  {
    userId: 6,
    id: 102,
    title: "sed ab consequatur",
    selected: false,
  },
  {
    userId: 6,
    id: 103,
    title: "non sunt delectus illo nulla tenetur enim omnis",
    selected: false,
  },
  {
    userId: 6,
    id: 104,
    title: "excepturi non laudantium quo",
    selected: false,
  },
  {
    userId: 6,
    id: 105,
    title: "totam quia dolorem et illum repellat voluptas optio",
    selected: false,
  },
  {
    userId: 6,
    id: 106,
    title: "ad illo quis voluptatem temporibus",
    selected: false,
  },
  {
    userId: 6,
    id: 107,
    title: "praesentium facilis omnis laudantium fugit ad iusto nihil nesciunt",
    selected: false,
  },
  {
    userId: 6,
    id: 108,
    title: "a eos eaque nihil et exercitationem incidunt delectus",
    selected: false,
  },
  {
    userId: 6,
    id: 109,
    title: "autem temporibus harum quisquam in culpa",
    selected: false,
  },
  {
    userId: 6,
    id: 110,
    title: "aut aut ea corporis",
    selected: false,
  },
  {
    userId: 6,
    id: 111,
    title: "magni accusantium labore et id quis provident",
    selected: false,
  },
  {
    userId: 6,
    id: 112,
    title:
      "consectetur impedit quisquam qui deserunt non rerum consequuntur eius",
    selected: false,
  },
  {
    userId: 6,
    id: 113,
    title: "quia atque aliquam sunt impedit voluptatum rerum assumenda nisi",
    selected: false,
  },
  {
    userId: 6,
    id: 114,
    title: "cupiditate quos possimus corporis quisquam exercitationem beatae",
    selected: false,
  },
  {
    userId: 6,
    id: 115,
    title: "sed et ea eum",
    selected: false,
  },
  {
    userId: 6,
    id: 116,
    title: "ipsa dolores vel facilis ut",
    selected: false,
  },
  {
    userId: 6,
    id: 117,
    title: "sequi quae est et qui qui eveniet asperiores",
    selected: false,
  },
  {
    userId: 6,
    id: 118,
    title: "quia modi consequatur vero fugiat",
    selected: false,
  },
  {
    userId: 6,
    id: 119,
    title: "corporis ducimus ea perspiciatis iste",
    selected: false,
  },
  {
    userId: 6,
    id: 120,
    title: "dolorem laboriosam vel voluptas et aliquam quasi",
    selected: false,
  },
  {
    userId: 7,
    id: 121,
    title: "inventore aut nihil minima laudantium hic qui omnis",
    selected: false,
  },
  {
    userId: 7,
    id: 122,
    title: "provident aut nobis culpa",
    selected: false,
  },
  {
    userId: 7,
    id: 123,
    title: "esse et quis iste est earum aut impedit",
    selected: false,
  },
  {
    userId: 7,
    id: 124,
    title: "qui consectetur id",
    selected: false,
  },
  {
    userId: 7,
    id: 125,
    title: "aut quasi autem iste tempore illum possimus",
    selected: false,
  },
  {
    userId: 7,
    id: 126,
    title: "ut asperiores perspiciatis veniam ipsum rerum saepe",
    selected: false,
  },
  {
    userId: 7,
    id: 127,
    title: "voluptatem libero consectetur rerum ut",
    selected: false,
  },
  {
    userId: 7,
    id: 128,
    title: "eius omnis est qui voluptatem autem",
    selected: false,
  },
  {
    userId: 7,
    id: 129,
    title: "rerum culpa quis harum",
    selected: false,
  },
  {
    userId: 7,
    id: 130,
    title: "nulla aliquid eveniet harum laborum libero alias ut unde",
    selected: false,
  },
  {
    userId: 7,
    id: 131,
    title: "qui ea incidunt quis",
    selected: false,
  },
  {
    userId: 7,
    id: 132,
    title: "qui molestiae voluptatibus velit iure harum quisquam",
    selected: false,
  },
  {
    userId: 7,
    id: 133,
    title: "et labore eos enim rerum consequatur sunt",
    selected: false,
  },
  {
    userId: 7,
    id: 134,
    title: "molestiae doloribus et laborum quod ea",
    selected: false,
  },
  {
    userId: 7,
    id: 135,
    title: "facere ipsa nam eum voluptates reiciendis vero qui",
    selected: false,
  },
  {
    userId: 7,
    id: 136,
    title: "asperiores illo tempora fuga sed ut quasi adipisci",
    selected: false,
  },
  {
    userId: 7,
    id: 137,
    title: "qui sit non",
    selected: false,
  },
  {
    userId: 7,
    id: 138,
    title: "placeat minima consequatur rem qui ut",
    selected: false,
  },
  {
    userId: 7,
    id: 139,
    title: "consequatur doloribus id possimus voluptas a voluptatem",
    selected: false,
  },
  {
    userId: 7,
    id: 140,
    title: "aut consectetur in blanditiis deserunt quia sed laboriosam",
    selected: false,
  },
  {
    userId: 8,
    id: 141,
    title: "explicabo consectetur debitis voluptates quas quae culpa rerum non",
    selected: false,
  },
  {
    userId: 8,
    id: 142,
    title: "maiores accusantium architecto necessitatibus reiciendis ea aut",
    selected: false,
  },
  {
    userId: 8,
    id: 143,
    title: "eum non recusandae cupiditate animi",
    selected: false,
  },
  {
    userId: 8,
    id: 144,
    title: "ut eum exercitationem sint",
    selected: false,
  },
  {
    userId: 8,
    id: 145,
    title: "beatae qui ullam incidunt voluptatem non nisi aliquam",
    selected: false,
  },
  {
    userId: 8,
    id: 146,
    title: "molestiae suscipit ratione nihil odio libero impedit vero totam",
    selected: false,
  },
  {
    userId: 8,
    id: 147,
    title: "eum itaque quod reprehenderit et facilis dolor autem ut",
    selected: false,
  },
  {
    userId: 8,
    id: 148,
    title: "esse quas et quo quasi exercitationem",
    selected: false,
  },
  {
    userId: 8,
    id: 149,
    title: "animi voluptas quod perferendis est",
    selected: false,
  },
  {
    userId: 8,
    id: 150,
    title: "eos amet tempore laudantium fugit a",
    selected: false,
  },
  {
    userId: 8,
    id: 151,
    title: "accusamus adipisci dicta qui quo ea explicabo sed vero",
    selected: false,
  },
  {
    userId: 8,
    id: 152,
    title: "odit eligendi recusandae doloremque cumque non",
    selected: false,
  },
  {
    userId: 8,
    id: 153,
    title: "ea aperiam consequatur qui repellat eos",
    selected: false,
  },
  {
    userId: 8,
    id: 154,
    title: "rerum non ex sapiente",
    selected: false,
  },
  {
    userId: 8,
    id: 155,
    title: "voluptatem nobis consequatur et assumenda magnam",
    selected: false,
  },
  {
    userId: 8,
    id: 156,
    title: "nam quia quia nulla repellat assumenda quibusdam sit nobis",
    selected: false,
  },
  {
    userId: 8,
    id: 157,
    title: "dolorem veniam quisquam deserunt repellendus",
    selected: false,
  },
  {
    userId: 8,
    id: 158,
    title: "debitis vitae delectus et harum accusamus aut deleniti a",
    selected: false,
  },
  {
    userId: 8,
    id: 159,
    title: "debitis adipisci quibusdam aliquam sed dolore ea praesentium nobis",
    selected: false,
  },
  {
    userId: 8,
    id: 160,
    title: "et praesentium aliquam est",
    selected: false,
  },
  {
    userId: 9,
    id: 161,
    title: "ex hic consequuntur earum omnis alias ut occaecati culpa",
    selected: false,
  },
  {
    userId: 9,
    id: 162,
    title: "omnis laboriosam molestias animi sunt dolore",
    selected: false,
  },
  {
    userId: 9,
    id: 163,
    title: "natus corrupti maxime laudantium et voluptatem laboriosam odit",
    selected: false,
  },
  {
    userId: 9,
    id: 164,
    title: "reprehenderit quos aut aut consequatur est sed",
    selected: false,
  },
  {
    userId: 9,
    id: 165,
    title: "fugiat perferendis sed aut quidem",
    selected: false,
  },
  {
    userId: 9,
    id: 166,
    title: "quos quo possimus suscipit minima ut",
    selected: false,
  },
  {
    userId: 9,
    id: 167,
    title: "et quis minus quo a asperiores molestiae",
    selected: false,
  },
  {
    userId: 9,
    id: 168,
    title: "recusandae quia qui sunt libero",
    selected: false,
  },
  {
    userId: 9,
    id: 169,
    title: "ea odio perferendis officiis",
    selected: false,
  },
  {
    userId: 9,
    id: 170,
    title: "quisquam aliquam quia doloribus aut",
    selected: false,
  },
  {
    userId: 9,
    id: 171,
    title: "fugiat aut voluptatibus corrupti deleniti velit iste odio",
    selected: false,
  },
  {
    userId: 9,
    id: 172,
    title: "et provident amet rerum consectetur et voluptatum",
    selected: false,
  },
  {
    userId: 9,
    id: 173,
    title: "harum ad aperiam quis",
    selected: false,
  },
  {
    userId: 9,
    id: 174,
    title: "similique aut quo",
    selected: false,
  },
  {
    userId: 9,
    id: 175,
    title:
      "laudantium eius officia perferendis provident perspiciatis asperiores",
    selected: false,
  },
  {
    userId: 9,
    id: 176,
    title: "magni soluta corrupti ut maiores rem quidem",
    selected: false,
  },
  {
    userId: 9,
    id: 177,
    title: "et placeat temporibus voluptas est tempora quos quibusdam",
    selected: false,
  },
  {
    userId: 9,
    id: 178,
    title: "nesciunt itaque commodi tempore",
    selected: false,
  },
  {
    userId: 9,
    id: 179,
    title: "omnis consequuntur cupiditate impedit itaque ipsam quo",
    selected: false,
  },
  {
    userId: 9,
    id: 180,
    title: "debitis nisi et dolorem repellat et",
    selected: false,
  },
  {
    userId: 10,
    id: 181,
    title: "ut cupiditate sequi aliquam fuga maiores",
    selected: false,
  },
  {
    userId: 10,
    id: 182,
    title: "inventore saepe cumque et aut illum enim",
    selected: false,
  },
  {
    userId: 10,
    id: 183,
    title: "omnis nulla eum aliquam distinctio",
    selected: false,
  },
  {
    userId: 10,
    id: 184,
    title: "molestias modi perferendis perspiciatis",
    selected: false,
  },
  {
    userId: 10,
    id: 185,
    title: "voluptates dignissimos sed doloribus animi quaerat aut",
    selected: false,
  },
  {
    userId: 10,
    id: 186,
    title: "explicabo odio est et",
    selected: false,
  },
  {
    userId: 10,
    id: 187,
    title: "consequuntur animi possimus",
    selected: false,
  },
  {
    userId: 10,
    id: 188,
    title: "vel non beatae est",
    selected: false,
  },
  {
    userId: 10,
    id: 189,
    title: "culpa eius et voluptatem et",
    selected: false,
  },
  {
    userId: 10,
    id: 190,
    title: "accusamus sint iusto et voluptatem exercitationem",
    selected: false,
  },
  {
    userId: 10,
    id: 191,
    title:
      "temporibus atque distinctio omnis eius impedit tempore molestias pariatur",
    selected: false,
  },
  {
    userId: 10,
    id: 192,
    title: "ut quas possimus exercitationem sint voluptates",
    selected: false,
  },
  {
    userId: 10,
    id: 193,
    title: "rerum debitis voluptatem qui eveniet tempora distinctio a",
    selected: false,
  },
  {
    userId: 10,
    id: 194,
    title: "sed ut vero sit molestiae",
    selected: false,
  },
  {
    userId: 10,
    id: 195,
    title: "rerum ex veniam mollitia voluptatibus pariatur",
    selected: false,
  },
  {
    userId: 10,
    id: 196,
    title: "consequuntur aut ut fugit similique",
    selected: false,
  },
  {
    userId: 10,
    id: 197,
    title: "dignissimos quo nobis earum saepe",
    selected: false,
  },
  {
    userId: 10,
    id: 198,
    title: "quis eius est sint explicabo",
    selected: false,
  },
  {
    userId: 10,
    id: 199,
    title: "numquam repellendus a magnam",
    selected: false,
  },
  {
    userId: 10,
    id: 200,
    title: "ipsam aperiam voluptates qui",
    selected: false,
  },
]);
const results = ref([]);
const inputText = ref("");
const selectedItemsMap = new Map();
const selectedItemsArray = ref([]);
const resultsLoading = ref(false)

const searchHandler = () => {
  resultsLoading.value = true
  setTimeout(()=> {
    resultsLoading.value = false
  }, 800)
  results.value = data.filter((el) => {
    el.title.includes(inputText.value)
    console.log(inputText.value, el.title);
  });
};

const selectItem = (item: any): void => {
  if (!selectedItemsMap.has(item)) {
    selectedItemsMap.set(item, item);
  } else {
    selectedItemsMap.delete(item);
  }
  // convert the map object into array so I can easily use it in the template
  const arr = Array.from(selectedItemsMap, ([key, val]) => {
    return val;
  });

  selectedItemsArray.value = arr;
};
</script>
<style scoped>
.title-section {
  cursor: pointer;
  text-transform: capitalize;
}
.title-section:hover {
  background: var(--bs-light-primary);
}
.selected-item {
  background: var(--bs-active-primary);
  color: var(--bs-light);
}
.selected-item:hover {
  background: var(--bs-active-primary);
}
</style>
