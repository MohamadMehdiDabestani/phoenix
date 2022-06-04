import { withoutLayout } from "@/redux/action/Actions";
import { Box, Typography } from "@mui/material";
import { createClient } from "contentful";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
const P = ({ json }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(withoutLayout(true));
    if (json) {
      console.log("first if", json);
      const post = JSON.parse(json);
      router.push(`/panel/blog/${post.fields.slug}`);
    }
    return function cleanUp() {
      dispatch(withoutLayout(false));
    };
  }, [json]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: " column",
        alignItems: " center",
        height: "100%",
        justifyContent: " space-around",
        "& >span> img": {
          width: "60% !important",
          height: "100% !important",
          position: "unset !important",
        },
        "& >span": {
          position: "unset !important",
          width: "100% !important",
          height: "80% !important",
        },
      }}
    >
      <Head>
        <title>فونکس کریپتو | شما در حال انتقال به صفه ی مورد نظر هستیند</title>
      </Head>
      <Image
        layout="fill"
        className="img"
        src="/image/undraw_map_re_60yf.svg"
        alt="شما در حال انتقال به سایت مورد نظر هستید"
      />
      <Typography variant="h6" component="p">
        شما در حال انتقال به صفه ی مورد نظر هستید
      </Typography>
    </Box>
  );
};
const client = createClient({
  space: process.env.CONTENTFULL_SPACEID,
  accessToken: process.env.CONTENTFULL_ACCESSKEY,
});
export async function getStaticPaths() {
  const res = await client.getEntries({
    content_type: "cryptoTool",
    select: "fields.shortLink",
  });
  const paths = res.items.map((el) => {
    return {
      params: { slug: el.fields.shortLink },
    };
  });
  return {
    paths,
    fallback: true,
  };
}
export async function getStaticProps({ params }) {
  const { items } = await client.getEntries({
    content_type: "cryptoTool",
    "fields.shortLink": `/p/${params.slug}`,
    select: "fields.slug",
  });
  console.log("items", items[0]);
  return {
    props: {
      json: JSON.stringify(items[0]),
    },
    revalidate: 1,
  };
}
export default P;