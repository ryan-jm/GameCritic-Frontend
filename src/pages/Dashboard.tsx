import {
    EuiAccordion,
    EuiAvatar,
    EuiButton,
    EuiCard,
    EuiFlexGrid,
    EuiFlexGroup,
    EuiFlexItem,
    EuiHealth,
    EuiHorizontalRule,
    EuiIcon,
    EuiLink,
    EuiPage,
    EuiPageBody,
    EuiPageContentBody,
    EuiPageHeader,
    EuiPanel,
    EuiSpacer,
    EuiStat,
    EuiText,
} from '@elastic/eui';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as API from '../api/Reviews';
import CreateReview from '../components/Reviews/CreateReview';
import { useAuth } from '../stores/AuthContext';
import { Review } from '../types/review.types';

interface IStats {
  reviewsPosted: number;
  reviewsLiked: number;
  commentsPosted: number;
  commentsLiked: number;
  favouriteReviews: Array<Review | null>;
}

const initialStats = {
  reviewsPosted: 0,
  reviewsLiked: 0,
  commentsPosted: 0,
  commentsLiked: 0,
  favouriteReviews: [],
};

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<IStats>(initialStats);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [apiAlive, setApiAlive] = useState<boolean>(true);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const getStats = async () => {
      API.validate(user?.token ?? '');
      const reviews = await API.fetchAllReviews();
      const votes = await API.fetchVotes(user);
      const postedReviews = reviews.filter(
        (review: Review) => review.owner === user?.username
      );
      const reviewCount = postedReviews.length;
      const voteCount = votes.length;
      const favouriteReviews = await Promise.all(
        votes.map(async (vote: any) => {
          const review = await API.getSingleReview(vote?.review);
          return review;
        })
      );

      setStats((prev: IStats) => {
        return {
          ...prev,
          reviewsPosted: reviewCount,
          reviewsLiked: voteCount,
          favouriteReviews,
        };
      });
    };

    if (user) {
      getStats()
        .then(() => setIsLoading(false))
        .catch(() => setApiAlive(false));
    }
  }, [user]);

  return (
    <EuiPage paddingSize="l">
      <EuiPageBody>
        <EuiPageHeader
          pageTitle={
            <>
              <EuiAvatar
                name={user?.name ?? 'none'}
                imageUrl={user?.avatar_url ?? ''}
                size="l"
              />
              <span
                style={{ marginLeft: '1rem' }}
              >{`Welcome back, ${user?.username}`}</span>
            </>
          }
          rightSideItems={[
            <EuiButton fill iconType="pencil" onClick={() => setModalVisible(true)}>
              Create
            </EuiButton>,
            <EuiButton
              iconType="exit"
              color="accent"
              onClick={() => {
                logout(user?.username ?? '');
                navigate('/');
              }}
            >
              Logout
            </EuiButton>,
          ]}
          bottomBorder
          style={{ marginTop: '4rem' }}
        />
        <EuiPageContentBody restrictWidth={'75%'}>
          <EuiFlexGrid columns={1} gutterSize="l">
            <EuiFlexItem>
              <EuiPanel>
                <EuiText textAlign="center">
                  <h2>Your stats:</h2>
                </EuiText>
                <EuiFlexGroup justifyContent="spaceEvenly">
                  <EuiFlexItem grow={false}>
                    <EuiCard
                      title=""
                      paddingSize="l"
                      display="transparent"
                      hasBorder
                      style={{ width: 200 }}
                    >
                      <EuiStat
                        isLoading={isLoading}
                        title={stats.reviewsPosted}
                        description="Reviews Posted"
                        textAlign="right"
                        titleColor="accent"
                      >
                        <EuiIcon type="pencil" color="accent" />
                      </EuiStat>
                    </EuiCard>
                  </EuiFlexItem>
                  <EuiFlexItem grow={false}>
                    <EuiCard
                      title=""
                      paddingSize="l"
                      display="transparent"
                      hasBorder
                      style={{ width: 200 }}
                    >
                      <EuiStat
                        isLoading={isLoading}
                        textAlign="right"
                        title={stats.reviewsLiked}
                        description="Reviews Liked"
                        titleColor="accent"
                      >
                        <EuiIcon color="accent" type="starEmpty" />
                      </EuiStat>
                    </EuiCard>
                  </EuiFlexItem>
                  <EuiFlexItem grow={false}>
                    <EuiCard
                      title=""
                      paddingSize="l"
                      display="transparent"
                      hasBorder
                      style={{ width: 200 }}
                      betaBadgeProps={{
                        label: 'In-development',
                        tooltipContent:
                          'This stat is currently unavailable until an endpoint is exposed.',
                      }}
                    >
                      <EuiStat
                        isLoading={isLoading}
                        textAlign="right"
                        title={stats.commentsPosted}
                        description="Comments Posted"
                        titleColor="primary"
                      >
                        <EuiIcon color="primary" type="check" />
                      </EuiStat>
                    </EuiCard>
                  </EuiFlexItem>
                  <EuiFlexItem grow={false}>
                    <EuiCard
                      title=""
                      paddingSize="l"
                      display="transparent"
                      hasBorder
                      style={{ width: 200 }}
                      betaBadgeProps={{
                        label: 'In-development',
                        tooltipContent:
                          'This stat is currently unavailable until an endpoint is exposed.',
                      }}
                    >
                      <EuiStat
                        isLoading={isLoading}
                        textAlign="right"
                        title={stats.commentsLiked}
                        description="Comments Liked"
                        titleColor="primary"
                      >
                        <EuiIcon color="primary" type="heart" />
                      </EuiStat>
                    </EuiCard>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiPanel>
            </EuiFlexItem>
          </EuiFlexGrid>
          <EuiFlexGrid columns={2}>
            <EuiFlexItem>
              <EuiPanel>
                <EuiText textAlign="center">
                  <h2>Your favourites</h2>
                </EuiText>
                <EuiHorizontalRule size="half" />
                <EuiFlexGroup gutterSize="l" direction="column">
                  {stats.favouriteReviews.map((review: Review | null, index: number) => (
                    <EuiFlexItem>
                      <EuiCard
                        display="subdued"
                        layout="horizontal"
                        key={review?.review_id || `review-${index}`}
                        title={review?.title ?? ''}
                        icon={<EuiIcon type={review?.review_img_url ?? ''} size="xxl" />}
                        description={`${review?.review_body?.slice(0, 100)}...` ?? ''}
                        onClick={() => navigate(`/reviews/${review?.review_id}`)}
                      >
                        <EuiLink>
                          <span>Read more...</span>
                        </EuiLink>
                      </EuiCard>
                    </EuiFlexItem>
                  ))}
                </EuiFlexGroup>
              </EuiPanel>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiPanel>
                <EuiText textAlign="center">
                  <h2>About / FAQ</h2>
                </EuiText>
                <EuiHorizontalRule size="half" />
                <EuiAccordion
                  id="What?"
                  buttonContent="What's the purpose of this..?!"
                  paddingSize="l"
                  arrowDisplay="right"
                  initialIsOpen
                >
                  <EuiPanel color="subdued">
                    <EuiText textAlign="left">
                      <p>
                        This website was built as a part of my time at the Northcoders
                        bootcamp, an intensive 12-week course designed to prepare students
                        for working in a real-world development environment.
                      </p>
                      <p>
                        I have nothing but good things to say about the course, it's
                        informative, fun, and fast-paced. I highly recommend checking them
                        out at their{' '}
                        <EuiLink href="https://northcoders.com">website</EuiLink>
                      </p>
                    </EuiText>
                  </EuiPanel>
                </EuiAccordion>
                <EuiSpacer />
                <EuiAccordion
                  id="How?"
                  buttonContent="Cool, so how was it built..?"
                  paddingSize="l"
                  arrowDisplay="right"
                  initialIsOpen
                >
                  <EuiPanel color="subdued">
                    <EuiText textAlign="left">
                      <p>
                        The backend was created using Express.js, whilst the front-end was
                        made with React and the Elastic UI kit. There is no secure
                        authorization created for this yet, for now it is simply protected
                        through the use of JSON Web Tokens.
                      </p>
                      <EuiHealth color={apiAlive ? 'accent' : 'danger'}>
                        API Status: {apiAlive ? 'Good' : 'Offline'}
                      </EuiHealth>
                    </EuiText>
                  </EuiPanel>
                </EuiAccordion>
                <EuiSpacer />
              </EuiPanel>
            </EuiFlexItem>
          </EuiFlexGrid>
        </EuiPageContentBody>
      </EuiPageBody>
      <CreateReview visible={isModalVisible} toggle={setModalVisible} />
    </EuiPage>
  );
};

export default Dashboard;
