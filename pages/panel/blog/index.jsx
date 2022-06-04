import { BlogCard } from "@/components";
import { Grid } from "@mui/material";
import { createClient } from "contentful";
import Head from "next/head";

export const Blog = ({ list }) => {
  return (
    <Grid container spacing={4}>
      <Head>
        <title>کریپتو ققنوس | وبلاگ</title>
        <meta
          name="description"
          content="وبلاگ کریپتو ققنوس . آموزش , خبر , تحلیل , در حوزه ی کریپتو"
        />
      </Head>
      {list.map((el, idx) => (
        <Grid item xl={4} lg={4} md={4} sm={6} xs={12} key={idx}>
          <BlogCard post={el.fields} />
        </Grid>
      ))}
    </Grid>
  );
};
export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFULL_SPACEID,
    accessToken: process.env.CONTENTFULL_ACCESSKEY,
  });
  const res = await client.getEntries({
    content_type: "cryptoTool",
    select:
      "fields.title,fields.image,fields.altImage,fields.objectFit,fields.shortText,fields.slug",
  });
  return {
    props: {
      list: res.items,
    },
    revalidate: 1,
  };
}
export default Blog;
