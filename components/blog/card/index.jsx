import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";

export const BlogCard = ({ post }) => {
  const { image, title, slug, shortText, objectFit, altImage } = post;

  const config = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node) => {
        return <Typography variant="body2">{node.content[0].value}</Typography>;
      },
    },
  };

  return (
    <Card>
      <Link href={`/panel/blog/${slug}`}>
        <a>
          <Box
            sx={{
              "& >span> img": {
                width: "100% !important",
                height: "250px !important",
                position: "unset !important",
                objectFit: objectFit ? "cover" : "unset",
                padding: objectFit ? "0px" : "15px !important",
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
        </a>
      </Link>

      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={(theme) => ({
            a: {
              color: theme.palette.text.primary,
            },
          })}
        >
          <Link href={`/panel/blog/${slug}`}>
            <a title={title}>{title}</a>
          </Link>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {documentToReactComponents(shortText, config)}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={`/panel/blog/${slug}`}>
          <a>
            <Button size="small">ادامه</Button>
          </a>
        </Link>
      </CardActions>
    </Card>
  );
};
