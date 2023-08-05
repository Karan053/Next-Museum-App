import useSWR from "swr";
import Error from "next/error";
import { Card, Button } from "react-bootstrap";
import { useAtom } from 'jotai';
import { favouritesAtom } from "@/store";
import { useState, useEffect } from "react";
import { addToFavourites, removeFromFavourites } from "@/lib/userData";

export default function ArtworkCardDetail({ objectID }) {
  const [ favouritesList, setFavouritesList ] = useAtom(favouritesAtom);
  // const [ showAdded, setShowAdded] = useState(favouritesList.includes(objectID)); // to check favouritesList include the objectID and set showAdded to true or false
  const [ showAdded, setShowAdded] = useState(false); // set showAdded to false

  useEffect(()=>{
    setShowAdded(favouritesList?.includes(objectID))
  }, [favouritesList])

  async function favouritesClicked(){
    if (showAdded) {
      // setFavouritesList(current => current.filter(fav => fav != objectID));
      setFavouritesList(await removeFromFavourites(objectID));
      // console.log("now unadded");
      setShowAdded(false);
    } ;
    if (!showAdded) {
      // setFavouritesList(current => [...current, objectID]);
      setFavouritesList(await addToFavourites(objectID));
      // console.log("now added");
      setShowAdded(true);
    }
  }

  const { data, error } = useSWR(
    objectID?`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`: null
  );

  if (error) return <Error statusCode={404} />;
  if (data) {
    const {title, primaryImageSmall, objectDate, objectID, classification, medium, primaryImage, artistDisplayName, artistWikidata_URL, creditLine, dimensions} = data

    return (
      <>
        <Card>
          <Card.Img
            src={
              primaryImage
                ? primaryImage
                : "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"
            }
          />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>
              <strong>Date: </strong>
              {objectDate}
              <br />
              <strong>Classification: </strong>
              {classification}
              <br />
              <strong>Medium: </strong>
              {medium}
              <br />
              <br />
              <strong>Artist: </strong>
              {artistDisplayName ? (
                <>
                  {artistDisplayName}{" ( "}
                  <a href={artistWikidata_URL} target="_blank" rel="noreferrer">
                    wiki
                  </a>{" )"}
                </>
              ) : (
                "N/A"
              )}
              <br />
              <strong>Credit Line: </strong>
              {creditLine ? creditLine : "N>A"}
              <br />
              <strong>Dimension: </strong>
              {dimensions ? dimensions : "N/A"}
              <br />
            </Card.Text>
              <Button variant={showAdded?"primary":"outline-primary"} onClick={favouritesClicked}>{showAdded?"+ Favourite (added)":"+ Favourite"}</Button>
          </Card.Body>
        </Card>
      </>
    );
  } else return null;
}
