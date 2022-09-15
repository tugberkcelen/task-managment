<script>
import PageTitle from "@/components/shared/PageTitle.vue";
import QuickBox from "@/components/QuickBox.vue";
export default {
  name: "HomeView",

  components: {
    PageTitle,
    QuickBox,
  },

  data() {
    return {
      boxsContent: [
        {
          title: "home.boxsContent0.title",
          content: "home.boxsContent0.content",
          slug: "home.boxsContent0.slug",
          buttonText: "home.boxsContent0.buttonText",
        },
        {
          title: "home.boxsContent1.title",
          content: "home.boxsContent1.content",
          slug: "home.boxsContent1.slug",
          buttonText: "home.boxsContent1.buttonText",
        },
        {
          title: "home.boxsContent2.title",
          content: "home.boxsContent2.content",
          slug: "home.boxsContent2.slug",
          buttonText: "home.boxsContent2.buttonText",
        },
      ],
    };
  },
};
</script>

<template>
  <div class="home-page-view">
    <PageTitle :title="$t(`home.pageTitle`)" />
    <QuickBox :boxsContent="boxsContent" />
  </div>
</template>
