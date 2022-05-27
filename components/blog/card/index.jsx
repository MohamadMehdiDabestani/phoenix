import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export const BlogCard = ({ post }) => {
  const { image, title, slug, shortText } = post;
  return (
    <Card>
      <Box
        sx={{
          "& >span> img": {
            width: "100% !important",
            height: "250px !important",
            position: "unset !important",
            objectFit: "cover",
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
        />
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {shortText}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={`/panel/blog/${slug}`}>
          <Button size="small">ادامه</Button>
        </Link>
      </CardActions>
    </Card>
  );
};
