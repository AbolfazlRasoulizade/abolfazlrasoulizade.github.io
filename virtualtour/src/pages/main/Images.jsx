import { Box } from "@mui/material";
import { useRef, useEffect } from "react";

const Images = () => {
  const containerRef = useRef();

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.scrollWidth;
      const centerPosition = containerWidth / 2 - window.innerWidth / 2;
      containerRef.current.scrollLeft = centerPosition;
    }
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mb: 4,
      }}
    >
      <Box
        ref={containerRef}
        sx={{
          display: "flex",
          pt: 2,
          overflowX: "scroll",
          scrollBehavior: "smooth",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ mr: 1 }}>
            <Box
              component="img"
              src="/imgs/8.jpg"
              sx={{
                width: 170,
                height: 170,
                borderRadius: 3,
              }}
            ></Box>
          </Box>
          <Box sx={{ width: 170, mr: 1 }}>
            <Box
              component="img"
              src="/imgs/9.jpg"
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: 4,
              }}
            ></Box>
            <Box
              component="img"
              src="/imgs/10.jpg"
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: 4,
              }}
            ></Box>
          </Box>
        </Box>
        <Box sx={{ mr: 1 }}>
          <Box
            component="img"
            src="/imgs/11.jpg"
            sx={{
              width: 400,
              height: 400,
              borderRadius: 5,
            }}
          ></Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ width: 170, mr: 1 }}>
            <Box
              component="img"
              src="/imgs/12.jpg"
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: 4,
              }}
            ></Box>
            <Box
              component="img"
              src="/imgs/13.jpg"
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: 4,
              }}
            ></Box>
          </Box>
          <Box>
            <Box
              component="img"
              src="/imgs/14.jpg"
              sx={{
                width: 170,
                height: 170,
                borderRadius: 3,
              }}
            ></Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Images;
