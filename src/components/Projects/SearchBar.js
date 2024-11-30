import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const SearchBar = ({ onFilter }) => {
  const [search, setSearch] = useState("");
  const [techStack, setTechStack] = useState("");

  const handleSearch = () => {
    onFilter({ search, techStack });
  };

  return (
    <Box display="flex" alignItems="center" gap={2} mb={4}>
      <TextField
        label="Search projects"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        variant="outlined"
      />
      <TextField
        label="Filter by tech stack"
        fullWidth
        value={techStack}
        onChange={(e) => setTechStack(e.target.value)}
        variant="outlined"
      />
      <Button
        onClick={handleSearch}
        variant="contained"
        color="primary"
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
