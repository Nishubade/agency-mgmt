import React, { useEffect, useCallback, useState } from 'react';
import { Alert, Card, CardContent, Grid, Stack } from '@mui/material';
import BasicInfoCard from './BasicInfoCard';
import { PalikaCash, DonorCash, AgencyCash } from '../cash-tracker';
import MoreInfoCard from './MoreInfoCard';
import ChartCard from './ChartCard';
import ViewTabs from './ViewTabs';
import { useProjectContext } from '@contexts/projects';
import { useRouter } from 'next/router';
import { useRahat } from '@services/contracts/useRahat';
import { useAuthContext } from 'src/auth/useAuthContext';
import { useTheme } from '@mui/system';
import { SPACING } from '@config';
import { useRahatCash } from '@services/contracts/useRahatCash';
import SummaryCard from '@components/SummaryCard';
import SummaryTracker from '@sections/cash-tracker/tracker/SummaryTracker';
import { Page } from '@components/page';
import { getFlickrImages } from '@services/flickr';
import ImageSlider from './ImageSlider';
import TitleCard from './TitleActionCard';

const ProjectView = () => {
  const { roles } = useAuthContext();
  const { getProjectById, refresh, refreshData, singleProject } = useProjectContext();
  const { projectBalance, rahatChainData, contract } = useRahat();
  const { contractWS: RahatCash } = useRahatCash();

  const [cashSummaryData, setCashSummaryData] = useState({});
  const [flickImages, setFlickImages] = useState([]);

  const {
    query: { projectId },
  } = useRouter();
  const theme = useTheme();

  const init = useCallback(async () => {
    if (!RahatCash) return;
    await projectBalance(projectId);
  }, [projectId, contract, RahatCash, refresh]);

  useEffect(() => {
    if (!projectId) return;
    getProjectById(projectId);
  }, [projectId]);

  useEffect(() => {
    if (!projectId || !contract) return;
    init(projectId);
  }, [projectId, RahatCash, refresh]);

  useEffect(() => {
    RahatCash?.on('Approval', refreshData);
    RahatCash?.on('Transfer', refreshData);
    return () => RahatCash?.removeAllListeners();
  }, [RahatCash]);

  useEffect(() => {
    const getFlickPics = async () => {
      const params = {
        per_page: 10,
      };
      const res = await getFlickrImages(params);
      setFlickImages(res.photo);
    };
    getFlickPics();

    return () => {
      setFlickImages([]);
    };
  }, []);

  return (
    <Page title={`${singleProject?.name}`} showBackTitle={false} nocard>
      <Grid container spacing={theme.spacing(SPACING.GRID_SPACING)}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={SPACING.GRID_SPACING}>
            <Grid item xs={12} md={12}>
              <ImageSlider list={flickImages} projectName={singleProject?.name} />
              <BasicInfoCard cashTrackerData={cashSummaryData} rahatChainData={rahatChainData} />
              <Card
                sx={{
                  mt: SPACING.GRID_SPACING,
                  mb: SPACING.GRID_SPACING,
                }}
              >
                <CardContent>
                  <SummaryTracker setCashSummaryData={setCashSummaryData} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={4}>
          <Grid container spacing={3}>
            <TitleCard rahatChainData={rahatChainData} />
            {false && (
              <Grid item xs={12} md={12}>
                <Alert severity={alert.type}> {alert?.message} </Alert>
              </Grid>
            )}
            <Grid item xs={12} md={12}>
              <MoreInfoCard />
            </Grid>
            <Grid item xs={12} md={12}>
              <ChartCard rahatChainData={rahatChainData} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* <Grid item xs={12} md={4}> */}
      {/* </Grid> */}
    </Page>
  );
};

ProjectView.propTypes = {};

export default ProjectView;
