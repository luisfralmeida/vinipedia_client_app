import InfiniteScroll from "react-infinite-scroller";
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import loadActionAsync from "../actions/load-action";
import tokenActionAsync from "../actions/token-action";
import { StyledContainer } from "../styles";
import SearchFilters from "../components/search-filters";
import { Icon, InlineIcon } from '@iconify/react';
import starFilled from '@iconify/icons-ant-design/star-filled';


export default function WineList () {

    const dispatch = useDispatch();

    const vinipediaData = useSelector(state => state.results);
    const authTokenData = useSelector(state => state.token);
    
    const [hasMore, setHasMore] = useState(true);

    const fetchMoreItems = () => {
        if (vinipediaData.count != null && vinipediaData.results.length >= vinipediaData.count) {
            // setHasMore(false);
        } else {
            // Since we are simply fetching more items, we don't want to reset the state variable 
            // storing all the results received so far.
            let reload = false;
            dispatch(loadActionAsync(vinipediaData ? vinipediaData.results.length : 0, 10, reload));
        }
    };

    const onGetTokenHandler = () => {
        dispatch(tokenActionAsync());
    }

    return (
        <StyledHome>
            <SearchFilters 
                setHasMore={setHasMore} />
            <InfiniteScroll
                loadMore={fetchMoreItems} 
                pageStart={0}
                hasMore={hasMore}
                loader={<div className="loader" key={0}></div>}
                initialLoad={true}
                useWindow={true}
                style={{display: "flex", 'flex-wrap':"wrap", 'flex-basis':"60%", 'max-width':"60%", 'align-content':'flex-start', 'padding-top':'2.5rem'}}>
                    {
                        vinipediaData.results.length > 0
                        ?
                        vinipediaData.results.map(vintage => {
                            return (
                                <StyledWine>
                                    <img src={vintage.wine.image ? vintage.wine.image : `${vintage.wine.type}.png`} alt={`${vintage.wine.name} ${vintage.year}`}></img>
                                    <div className="details">
                                        <div className="producer">{vintage.wine.producer.short_name ? vintage.wine.producer.short_name : vintage.wine.producer.name}</div>
                                        <div className="wine">{vintage.wine.name} {vintage.year ? vintage.year : 'N.V.' }</div>
                                        <div className="type">{vintage.wine.type}</div>
                                        <div className="region">{vintage.wine.origin.name}</div>
                                        {
                                            vintage.nr_reviews
                                            ?
                                            [
                                            <div className="reviews">
                                                <div className="rating">{vintage.average_score.toFixed(1)}</div>
                                                <div className="info">
                                                    <div className="stars">
                                                        <Icon icon={starFilled} />
                                                        <Icon icon={starFilled} />
                                                        <Icon icon={starFilled} />
                                                        <Icon icon={starFilled} />
                                                        <Icon icon={starFilled} />
                                                        <div className="mantinha" style={{background: `linear-gradient(to right, #ffffff00 ${vintage.average_score/5*100}%, #ffffffdd ${vintage.average_score/5*100}%)`}}></div>
                                                    </div>
                                                    <div className="nr_reviews">{`${vintage.nr_reviews > 1 ? vintage.nr_reviews + ' reviews' : vintage.nr_reviews + ' review'}`}</div>
                                                </div>
                                            </div>
                                            ]
                                            :
                                            <div className="reviews">Be the first to review this vintage</div>
                                        }
                                    </div>
                                </StyledWine>
                            )
                        })
                        :
                        <p>No matching results with these filters.</p>
                    }
            </InfiniteScroll>
            {/* <div>
                <div style={{position: "absolute", top: 0, right: 0}}>
                    <button type="button" onClick={onGetTokenHandler}>Get token</button>
                    <p>Token: <span>{authTokenData.token}</span></p>
                </div>
            </div> */}
        </StyledHome>
    )
}

const StyledRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    overflow-x: hidden;
`

const StyledWine = styled.div`
    display: flex;
    /* flex-direction: column; */
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-basis: 100%;
    max-width: 100%;
    height: 150pt;
    padding: 0.5rem;
    margin: 0.5rem 1rem;
    background-color: #fff;
    border-radius: 0.5rem;
    box-shadow: 0px 2px 15px 2px #ccc;
    img {
        /* height: 100%;
        flex-basis: 20%;  */
        height: 200px;
        width: 180px;
        object-fit: scale-down;
    }
    .details {
        height: 100%;
        width: 100%;
        flex-basis: 40%; 
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        padding-top: 0.5rem;

        .producer {
            font-family: "Roboto", sans-serif;
            font-size: 8pt;
            font-weight: lighter;
            margin-bottom: 3pt;
            text-transform: uppercase;
        }
        .wine {
            font-family: "Roboto", sans-serif;
            font-size: 14pt;
            font-weight: normal;
            text-transform: capitalize;
            font-weight: bold;
        }
        .type {
            font-family: "Roboto", sans-serif;
            font-size: 14pt;
            font-weight: normal;
            text-transform: capitalize;
        }
        .region {
            font-family: "Roboto", sans-serif;
            font-size: 10pt;
            font-weight: normal;
            text-transform: capitalize;
        }
        .reviews {
            display: flex;
            align-items: flex-end;
            margin: auto 0;
            margin-bottom: 10%;
            font-family: "Roboto", sans-serif;
            font-size: 10pt;
            .rating {
                font-family: "Roboto", sans-serif;
                font-size: 34pt;
                margin-right: 0.5rem;
            }
            .info {
                position: relative;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                height: 34pt;
                .stars {
                    white-space: nowrap;
                    svg {
                        color: darkred;
                    }
                    .mantinha {
                        position: absolute;
                        top: 0;
                        left: 0;
                        height: 16px;
                        width: 100%;
                        background-color: #ffffffbb;
                        z-index: 3;
                    }
                }
                .nr_reviews {
                    font-family: "Roboto", sans-serif;
                    font-size: 9pt;
                    font-weight: lighter;
                    text-transform: uppercase;
                    padding-left: 1pt;
                }
            }
        }
    }
    
    .extra {
        height: 100%;
        width: 100%;
        flex-basis: 40%; 
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
    }
`

const StyledHome = styled(StyledContainer)`
    margin-top: 10vh;

    div.content {
        height: 94vh;
        width: 100%;
        display: flex;
        & > div {
        margin-top: 18vh;
        }
    }
`