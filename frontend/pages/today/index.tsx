import React, { memo } from "react";
import styled from "styled-components";
import HotMagCard from "../../components/HotMagCard";
import Slidebar from "../../components/Slidebar";
import Emitter from "../../event/emitter";
import { Collector, EventObject } from "../../event";

const StyledHotMag = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 2.75rem;
  margin-bottom: 4.5rem;
`;

const StyledHotMagOverlay = styled.div`
  position: absolute;
  background-color: #f2f2f2;
  width: calc(100vw - 15rem);
  top: -4rem;
  z-index: 1;
  height: 28rem;
`;

const StyledSections = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0rem;
  & + & {
    border-top: 1px solid rgba(0, 0, 0, 0.3);
  }
`;
const test: EventObject = {
  simple: {
    identifier_1: {
      event_id: 1,
      event_type: "click",
      once: true,
      description: "너무 잼따",
    },
    identifier_2: {
      event_id: 2,
      event_type: "mouseover",
      once: true,
      description: "이건 두번째 식별자에요~",
    },
  },
};
const IndexPage = memo(({ Magazines, News, Playlists }: any) => {
  return (
    <Collector eventConfig={test} dispatch={console.log}>
      <StyledHotMag>
        <HotMagCard />
        <StyledHotMagOverlay />
      </StyledHotMag>
      <StyledSections>
        <Emitter identifier="identifier_1" eventType={["click"]}>
          <h1> 이벤트 테스트</h1>
        </Emitter>
        <Emitter identifier="identifier_2" eventType={["mouseover"]}>
          <h1> 마우스 오버 테스트</h1>
        </Emitter>
        <Slidebar
          varient="todayBig"
          dataType="magazine"
          title="매거진"
          titleLink=""
          data={Magazines}
        />
      </StyledSections>
      <StyledSections>
        <Slidebar varient="todayNews" dataType="news" title="News" titleLink="" data={News} />
      </StyledSections>
      <StyledSections>
        <Slidebar
          varient="todayBig"
          dataType="playlist"
          title="VIBE 추천 플레이리스트"
          titleLink=""
          data={Playlists}
        />
      </StyledSections>
    </Collector>
  );
});

export default IndexPage;

export async function getStaticProps() {
  const apiUrl = process.env.API_URL;
  const apiPort = process.env.API_PORT;

  const VIBE_ID = 1; // 나중에 vibe 아이디로 변경해야 함
  const dataLength = 10;

  try {
    const resolveArr = await Promise.all([
      fetch(`${apiUrl}:${apiPort}/api/magazines?limit=${dataLength}`),
      fetch(`${apiUrl}:${apiPort}/api/news?limit=${dataLength}`),
      fetch(`${apiUrl}:${apiPort}/api/playlists?filter=${VIBE_ID}&limit=${dataLength}`),
    ]);
    console.log(apiPort, apiUrl);
    const result = await Promise.all(resolveArr.map((resolve) => resolve.json()));
    const { Magazines } = result[0];
    const { News } = result[1];
    const { Playlists } = result[2];

    return {
      props: {
        Magazines,
        News,
        Playlists,
      },
    };
  } catch (err) {
    console.log(err);
  }
  return { props: {} };
}
