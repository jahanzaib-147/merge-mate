import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import ClearIcon from "@mui/icons-material/Clear";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";

const ProjectCard = ({ projects, onSwipeRight, onSwipeLeft, onRefresh }) => {
  return (
    <Swiper
      effect="coverflow"
      grabCursor={true}
      centeredSlides={true}
      slidesPerView="auto"
      navigation
      pagination={{ clickable: true }}
      modules={[Navigation, Pagination, EffectCoverflow]}
      style={{ width: "100%", height: "500px" }}
    >
      {projects.map((project, index) => (
        <SwiperSlide key={index}>
          <Card
            sx={{
              width: 300,
              mx: "auto",
              boxShadow: 6,
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <CardMedia
              component="img"
              height="250"
              image={project.image}
              alt={project.title}
            />
            <CardContent sx={{ textAlign: "center" }}>
              <Typography
                variant="h6"
                component="div"
                gutterBottom
                sx={{ fontWeight: 600 }}
              >
                {project.title}, {project.age}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {project.description}
              </Typography>
            </CardContent>
            <Box
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              py={2}
            >
              <IconButton color="warning" onClick={onRefresh}>
                <ReplayIcon fontSize="large" />
              </IconButton>
              <IconButton color="error" onClick={() => onSwipeLeft(project)}>
                <ClearIcon fontSize="large" />
              </IconButton>
              <IconButton color="success" onClick={() => onSwipeRight(project)}>
                <FavoriteIcon fontSize="large" />
              </IconButton>
              <IconButton color="primary">
                <StarIcon fontSize="large" />
              </IconButton>
            </Box>
          </Card>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProjectCard;
