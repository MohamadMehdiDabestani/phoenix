import { toggleSnackBar } from "@/redux/action/Actions";
import useCopyToClipboard from "@/hooks/useCopyToClipboard";
import { createClient } from "contentful";
import {
  Box,
  Chip,
  Grid,
  Paper,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { useDispatch } from "react-redux";
import { toggleLoading } from "@/redux/action/Actions";
import { BlogCard, Loading } from "@/components";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Head from "next/head";
import { Fragment } from "react";
import { useRouter } from "next/router";
const client = createClient({
  space: process.env.CONTENTFULL_SPACEID,
  accessToken: process.env.CONTENTFULL_ACCESSKEY,
});

const Post = ({ post, relatedPostList }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  if (!post) {
    dispatch(toggleLoading({ show: true, isGlobal: true }));
    return <Loading />;
  } else {
    const [value, copy] = useCopyToClipboard(); // eslint-disable-line
    const matches = useMediaQuery((theme) => theme.breakpoints.down("md"));
    const {
      title,
      image,
      text,
      list,
      objectFit,
      altImage,
      pageTitle,
      description,
      keywords,
      shortLink,
    } = post.fields;
    const handleCopyShortLink = () => {
      copy(`https://phoenixcrypto.vercel.app${shortLink}`);
      dispatch(toggleSnackBar({ message: "پیوند کپی شد", show: true }));
    };
    const renderedOption = {
      renderNode: {
        [INLINES.HYPERLINK]: (node) => {
          return (
            <a
              href={node.data.uri}
              target="_blank"
              rel="noreferrer"
              className="link"
            >
              {node.content[0].value}
            </a>
          );
        },
        [BLOCKS.EMBEDDED_ASSET]: (node) => {
          return (
            <Box
              sx={{
                "& >span> img": {
                  width: `100% !important`,
                  height: `450px !important`,
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
                src={`https:${node.data.target.fields.file.url}`}
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
      <Fragment>
        <Paper
          sx={{
            padding: "20px",
            "& .link": {
              color: "#8381f9",
              textDecoration: "none",
            },
          }}
        >
          <Head>
            <title>کریپتو ققنوس | {pageTitle}</title>
            <meta property="og:type" content="article" />
            <meta property="og:title" content={title} />
            <meta
              property="og:image"
              content={`https:${image.fields.file.url}`}
            />
            <meta
              property="og:url"
              content={`https://phoenixcrypto.vercel.app${shortLink}`}
            />
            <meta property="og:site_name" content="The Phoenix Crypto" />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <link
              rel="canonical"
              href={`https://phoenixcrypto.vercel.app/panel/blog/${router.query.slug}`}
            />
          </Head>

          <Box
            sx={{
              marginBottom: "45px",
              display: "flex",
              flexDirection: matches ? "column" : "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h4" component="h1">
              {title}
            </Typography>
            <Box
              component="span"
              sx={{
                border: "2px solid #cfd8dc",
                marginTop: matches ? "15px" : "0",
                borderRadius: "5px",
                display: "flex",
              }}
            >
              <Typography
                sx={{ padding: "7px", fontSize: matches ? "12px" : "1rem" }}
              >
                لینک کوتاه : {`https://phoenixcrypto.vercel.app${shortLink}`}
              </Typography>
              <Box
                component="span"
                sx={{
                  padding: "5px",
                  borderLeft: "2px solid #cfd8dc",
                  display: "flex",
                  cursor: "pointer",
                }}
              >
                <Tooltip title="کپی" arrow>
                  <ContentCopyIcon onClick={handleCopyShortLink} />
                </Tooltip>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              "& >span> img": {
                objectFit: objectFit ? "cover" : "unset",
                width: "100% !important",
                height: "550px !important",
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
              sx={{ margin: "5px" }}
              key={idx}
              label={el}
              variant="outlined"
              onClick={() => console.log("")}
            />
          ))}
        </Paper>
        {relatedPostList.length > 0 && (
          <Box sx={{ margin: "15px 0" }}>
            <Typography component="p" variant="h6">
              هم چنین بررسی کنید
            </Typography>
            <Grid container sx={{ marginTop: "20px" }}>
              {relatedPostList.map((el, idx) => (
                <Grid item xl={4} lg={4} md={4} sm={6} xs={12} key={idx}>
                  <BlogCard post={el.fields} key={idx} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Fragment>
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
  const relatedPostList = items[0].fields.relatedPost;
  delete items[0].fields.relatedPost;
  return {
    props: {
      post: items[0],
      relatedPostList: relatedPostList ? relatedPostList : [],
    },
    revalidate: 1,
  };
}
export default Post;
