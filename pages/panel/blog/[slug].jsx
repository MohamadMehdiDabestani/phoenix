import { toggleSnackBar } from "@/redux/action/Actions";
import useCopyToClipboard from "@/hooks/useCopyToClipboard";
import { createClient } from "contentful";
import { Box, Chip, Paper, Tooltip, Typography } from "@mui/material";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { useDispatch } from "react-redux";
import { toggleLoading } from "@/redux/action/Actions";
import { Loading } from "@/components";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Head from "next/head";
const client = createClient({
  space: process.env.CONTENTFULL_SPACEID,
  accessToken: process.env.CONTENTFULL_ACCESSKEY,
});

const Post = ({ post }) => {
  const dispatch = useDispatch();
  if (!post) {
    dispatch(toggleLoading({ show: true, isGlobal: true }));
    return <Loading />;
  } else {
    const [value, copy] = useCopyToClipboard(); // eslint-disable-line
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
          <meta property="og:title" content={pageTitle} />
          <meta property="og:description" content={description} />
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
        </Head>
        <Box
          sx={{
            marginBottom: "45px",
            display: "flex",
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
              borderRadius: "5px",
              display: "flex",
            }}
          >
            <Typography sx={{ padding: "7px" }}>
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
            sx={{ margin: "5px" }}
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
