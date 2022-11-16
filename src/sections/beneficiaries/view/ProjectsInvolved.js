import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { useRouter } from 'next/router';

const ProjectsInvolved = (props) => {
  const projectsInvolved = [
    {
      name: 'Mini Project_2 - 15,20 Sep 2022',
      id: '1',
    },
  ];

  const router = useRouter();

  const handleProjectClick = (id) => () => {
    router.push(`/projects/${id}/view`);
  };

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Typography variant="h5">Projects Involved</Typography>

        <Box>
          {projectsInvolved.map((project) => (
            <Button key={project.id} variant="outlined" sx={{ m: 1 }} onClick={handleProjectClick(project.id)}>
              {project.name}
            </Button>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

ProjectsInvolved.propTypes = {};

export default ProjectsInvolved;
