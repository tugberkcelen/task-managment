<script>
import PageHeader from "@/components/shared/PageHeader.vue";
import QuickBox from "@/components/QuickBox.vue";
export default {
  name: "HomeView",

  components: {
    PageHeader,
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
      ],
    };
  },
};
</script>

<template>
  <div class="home-page-view">
    <PageHeader :title="$t(`home.PageHeader`)" />
    <QuickBox :boxsContent="boxsContent" />
  </div>
</template>
