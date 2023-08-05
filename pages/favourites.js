import { Row, Col, Card } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";

export default function Favourites(){
    const [ favouritesList, setFavouritesList ] = useAtom(favouritesAtom);
    
    if(!favouritesList) return null;

    if (favouritesList) {
        // console.log(favouritesList);
        if (favouritesList.length > 0) {
          return (
            <>
              <Row className="gy-4">
                {favouritesList.map((currentObjectID) => (
                  <Col lg={3} key={currentObjectID}>
                    <ArtworkCard objectID={currentObjectID} />
                  </Col>
                ))}
              </Row> 
            </>
          );
        }
        if (favouritesList.length == 0) {
          return (
            <Card>
              <Card.Body>
                <h4>Nothing Here</h4>Try adding some new artwork to the list.
              </Card.Body>
            </Card>
          );
        }
      }
      return null;

}``