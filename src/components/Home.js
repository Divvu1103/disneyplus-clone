import React from "react";
import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import Viewers from "./Viewers";
import Recommends from "./Recommends";
import NewDisney from "./NewDisney";
import Trending from "./Trending";
import Originals from "./Orignals";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import db from "../firebase";
import { setMovies } from "../features/movie/movieSlice";
import { selectUserName } from "../features/user/userSlice";
import {
  collection,
  query,
  onSnapshot,
  querySnapshot,
  doc,
  getDoc,
  getDocs
} from "firebase/firestore";
import Orignals from "./Orignals";

function Home(props) {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  let recommends = [];
  let newDisneys = [];
  let originals = [];
  let trending = [];
  useEffect( async () => {
    const q = query(collection(db, "movies"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      // console.log(originals);
      switch (doc.data().type) {
        case "recommend":
          recommends = [...recommends, { id: doc.id, ...doc.data() }];
          break;

        case "new":
          newDisneys = [...newDisneys, { id: doc.id, ...doc.data() }];
          break;

        case "original":
          originals = [...originals, { id: doc.id, ...doc.data() }];
          break;

        case "trending":
          trending = [...trending, { id: doc.id, ...doc.data() }];
          break;
      }
      dispatch(
        setMovies({
          recommend: recommends,
          newDisney: newDisneys,
          original: originals,
          trending: trending,
        })
      );
    })
    

  

    // db.collection("movies").onSnapshot((snapshot) => {
    //   snapshot.docs.map((doc) => {
    //     console.log(recommends);
    //     switch (doc.data().type) {
    //       case "recommend":
    //         recommends = [...recommends, { id: doc.id, ...doc.data() }];
    //         break;

    //       case "new":
    //         newDisneys = [...newDisneys, { id: doc.id, ...doc.data() }];
    //         break;

    //       case "original":
    //         originals = [...originals, { id: doc.id, ...doc.data() }];
    //         break;

    //       case "trending":
    //         trending = [...trending, { id: doc.id, ...doc.data() }];
    //         break;
    //     }
    //   });
    //   dispatch(
    //     setMovies({
    //       recommend: recommends,
    //       newDisney: newDisneys,
    //       original: originals,
    //       trending: trending,
    //     })
    //   );
    // });
  }, [userName]);

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Recommends />
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  );
}
const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;
