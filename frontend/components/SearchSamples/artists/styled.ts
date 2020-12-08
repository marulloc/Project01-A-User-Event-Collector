import styled from "styled-components";

const StyledArtists = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const StyledArtist = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 12rem;
  height: 15em;
  & + & {
    margin: 3em; // TODO: 더 많은 데이터가 있을 때 간격 다시 확인해보기
  }
`;

const StyledCover = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 12rem;
`;

const StyledArtistName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1em;
  width: 12rem;
  box-sizing: border-box;
  font-size: 1.1em;
  padding: 0.5em 0em;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export { StyledArtists, StyledArtist, StyledCover, StyledArtistName };
