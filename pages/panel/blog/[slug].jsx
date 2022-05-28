import { createClient } from "contentful";
import { Box, Chip, Paper, Typography } from "@mui/material";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { useDispatch } from "react-redux";
import { toggleLoading } from "@/redux/action/Actions";
import { Loading } from "@/components";
import { BLOCKS } from "@contentful/rich-text-types";
import Head from "next/head";
const client = createClient({
  space: process.env.CONTENTFULL_SPACEID,
  accessToken: process.env.CONTENTFULL_ACCESSKEY,
});

const Post = ({ post }) => {
  if (!post) {
    const dispatch = useDispatch();

    dispatch(toggleLoading({ show: true, isGlobal: true }));
    return <Loading />;
  } else {
    const { title, image, text, list, objectFit , altImage , pageTitle , description , keywords } = post.fields;
    const renderedOption = {
      renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: (node) => {
          console.log('node ' , node);
          return (
            <Box
              sx={{
                "& >span> img": {
                  width: `100% !important`,
                  height: `350px !important`,
                  position: "unset !important",
                  objectFit: objectFit ? "cover" : "unset",
                },
                "& >span": {
                  position: "unset !important",
                  width: "100% !important",
                  height: "100% !important",
                },
              }}
            >
              <Image
                src={`https://${node.data.target.fields.file.url}`}
                className="img"
                layout="fill"
                alt={node.data.target.fields.description}
              />
            </Box>
          );
        },
      },
    };

    return (
      <Paper sx={{ padding: "20px" }}>
        <Head>
          <title>کریپتو ققنوس | {pageTitle}</title>
          <meta name="description" content={description}/>
          <meta name="keywords" content={keywords}/>
        </Head>
        <Typography variant="h4" component="h1" sx={{ marginBottom: "20px" }}>
          {title}
        </Typography>
        <Box
          sx={{
            "& >span> img": {
              objectFit: objectFit ? "cover" : "unset",
              width: "100% !important",
              height: "500px !important",
              position: "unset !important",
            },
            "& >span": {
              position: "unset !important",
              width: "100% !important",
              height: "100% !important",
            },
          }}
        >
          <Image
            src={`https:${image.fields.file.url}`}
            className="img"
            layout="fill"
            alt={altImage}
          />
        </Box>
        {documentToReactComponents(text, renderedOption)}
        <Typography sx={{ display: "flex", alignItems: "center" }}>
          <LocalOfferIcon fontSize="10px" sx={{ marginRight: "5px" }} />
          کلمات کلیدی :
        </Typography>
        {list.map((el, idx) => (
          <Chip
            sx={{ marginRight: "5px" }}
            key={idx}
            label={el}
            variant="outlined"
            onClick={() => console.log("")}
          />
        ))}
      </Paper>
    );
  }
};
export async function getStaticPaths() {
  const res = await client.getEntries({
    content_type: "cryptoTool",
  });
  const paths = res.items.map((el) => {
    return {
      params: { slug: el.fields.slug },
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
    "fields.slug": params.slug,
  });
  if (!items.length) {
    return {
      redirect: {
        destination: "/notfound",
        permanent: false,
      },
    };
  }
  return {
    props: {
      post: items[0],
    },
    revalidate: 1,
  };
}
export default Post;
