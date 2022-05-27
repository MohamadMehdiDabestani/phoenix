import { BlogCard } from "@/components";
import { Grid } from "@mui/material";
import { createClient } from "contentful";

export const Blog = ({ list }) => {
  return (
    <Grid container spacing={4}>
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
  });
  return {
    props: {
      list: res.items,
    },
    revalidate: 1,
  };
}
export default Blog;
