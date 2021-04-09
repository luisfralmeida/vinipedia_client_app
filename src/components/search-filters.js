import styled from "styled-components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import loadActionAsync from "../actions/load-action";
import addFilterAction from '../actions/add-filter-action';
import removeFilterAction from '../actions/remove-filter-action';
import resetFilterAction from '../actions/reset-filter-action';
import { defaultFilterState } from '../reducers/filters-reducer';

const SearchFilters = ({
    setHasMore
}) => {

    const dispatch = useDispatch();

    const searchFilters = useSelector(state => state.filters);

    useEffect(() => {
        // If the searchFilters have been modified, reset hasMore to true before 
        // loading and evaluating the data.
        setHasMore(true);
        if (searchFilters != defaultFilterState) {
            // If the searchFilters have been modified, reset the state variable 
            // storing the results received so far.
            let reload = true;
            dispatch(loadActionAsync(0, 10, reload));
        }
    }, [searchFilters, dispatch])

    const isValidQuery = (query) => {
        // arbitrary values for year input validation
        return (query.length > 2)
    }

    const isValidYear = (year) => {
        // arbitrary values for year input validation
        return (year >= 1700 && year <= 2050)
    }
    
    const isValidRating = (rating) => {
        // arbitrary values for year input validation
        return (rating >= 1 && rating <= 5)
    }
    
    const isValidAlcoholContent = (val) => {
        // arbitrary values for year input validation
        return (val >= 0 && val <= 100)
    }

    // Hardcoded values (all of these could be also accessed through an API call, but we opted to simplify the logic here - showing some of the most relevant only)
    const wine_types = ['white', 'red', 'rosé', 'sparkling', 'port', 'madeira', 'moscatel'];
    const producers = ['Bacalhôa Vinhos de Portugal', "Blandy's", 'Casa Ermelinda Freitas', 'Casa Mateus Rosé', 'Esporão', 'Monte da Ravasqueira', 'Quinta das Marias', 'Vidigal Wines', 'Symington Family Estates'];
    const regions = ['The Azores', 'Alentejo', 'Algarve', 'Bairrada', 'Beira Interior', 'Dão', 'Lisboa', 'Madeira', 'Setúbal Peninsula', 'Porto and Douro', 'Tejo', 'Trás-os-Montes', 'Távora-Varosa', 'Vinho Verde'];
    const grapes = ['Alvarinho', 'Antão Vaz', 'Aragonez', 'Arinto', 'Avesso', 'Baga', 'Bical', 'Malvasia Fina', 'Moscatel Graúdo', 'Rufete', 'Síria', 'Syrah', 'Tinta Barroca', 'Touriga Franca', 'Touriga Nacional', 'Trincadeira', 'Vinhão', 'Viosinho', 'Vital'];


    return (
        <StyledContainer>
            <StyledSideContext>
                <StyledDetails>
                        <StyledFiltersSection>
                            <h5>Wine types</h5>
                            <StyledFilterCategory>                    
                                { 
                                    wine_types.map((type) => {
                                        return <button value={`${type}`} 
                                                       className={`${searchFilters.type.includes(type) ? 'active' : ''}`} 
                                                       onClick={(e) => searchFilters.type.includes(type) ? 
                                                                       dispatch(removeFilterAction('type', type)) : 
                                                                       dispatch(addFilterAction('type', type))}>
                                                       {type}
                                               </button>
                                    })
                                }
                            </StyledFilterCategory>
                            <h5>Producers</h5>
                            <StyledFilterCategory>                 
                                { 
                                    producers.map((producer) => {
                                        return <button value={`${producer}`} 
                                                       className={`${searchFilters.producer.includes(producer) ? 'active' : ''}`} 
                                                       onClick={(e) => searchFilters.producer.includes(producer) ? 
                                                                       dispatch(removeFilterAction('producer', producer)) : 
                                                                       dispatch(addFilterAction('producer', producer))}>
                                                       {producer}
                                               </button>
                                    })
                                }
                            </StyledFilterCategory>
                            <h5>Regions</h5>
                            <StyledFilterCategory>             
                                { 
                                    regions.map((region) => {
                                        return <button value={`${region}`} 
                                                       className={`${searchFilters.region.includes(region) ? 'active' : ''}`} 
                                                       onClick={(e) => searchFilters.region.includes(region) ? 
                                                                       dispatch(removeFilterAction('region', region)) : 
                                                                       dispatch(addFilterAction('region', region))}>
                                                       {region}
                                               </button>
                                    })
                                }
                            </StyledFilterCategory>
                            <h5>Grapes</h5>
                            <StyledFilterCategory>          
                                { 
                                    grapes.map((grape) => {
                                        return <button value={`${grape}`} 
                                                       className={`${searchFilters.grape.includes(grape) ? 'active' : ''}`} 
                                                       onClick={(e) => searchFilters.grape.includes(grape) ? 
                                                                       dispatch(removeFilterAction('grape', grape)) : 
                                                                       dispatch(addFilterAction('grape', grape))}>
                                                       {grape}
                                               </button>
                                    })
                                }
                            </StyledFilterCategory>
                            <h5>Wine name</h5>
                            <StyledFilterCategory>
                                <input type="text" name="" id="name"
                                    onChange={(e) => isValidQuery(e.target.value) ? dispatch(addFilterAction('query', e.target.value)) : !e.target.value ? dispatch(removeFilterAction('query', e.target.value)) : null}>
                                </input>
                            </StyledFilterCategory>
                            <h5>Vintage year</h5>
                            <StyledFilterCategory>
                            <input type="number" name="" id="" min="1700" max="2050" step="1"
                                   onChange={(e) => isValidYear(e.target.value) ? dispatch(addFilterAction('year', e.target.value)) : !e.target.value ? dispatch(removeFilterAction('year', e.target.value)) : null}>
                            </input>
                            </StyledFilterCategory>
                            <h5>Minimum average rating</h5>
                            <StyledFilterCategory>
                                <input type="number" name="" id="" min="1" max="5" step="0.5"
                                    onChange={(e) => isValidRating(e.target.value) ? dispatch(addFilterAction('average_rating', e.target.value)) : !e.target.value ? dispatch(removeFilterAction('average_rating', e.target.value)) : null}>
                                </input>
                            </StyledFilterCategory>
                            <h5>Minimum number of reviews</h5>
                            <StyledFilterCategory>
                            <input type="number" name="" id="" min="0" step="1"
                                   onChange={(e) => e.target.value > 0 ? dispatch(addFilterAction('nr_reviews', e.target.value)) : !e.target.value ? dispatch(removeFilterAction('nr_reviews', e.target.value)) : null}>
                            </input>
                            </StyledFilterCategory>
                            <h5>Maximum alcohol content</h5>
                            <StyledFilterCategory>
                            <input type="number" name="" id="" min="0" max="100" step="1"
                                   onChange={(e) => isValidAlcoholContent(e.target.value) ? dispatch(addFilterAction('alcohol_content', e.target.value)) : !e.target.value ? dispatch(removeFilterAction('alcohol_content', e.target.value)) : null}>
                            </input>
                            </StyledFilterCategory>
                            <button onClick={(e) => dispatch(resetFilterAction())} style={{color:"white", "margin-left": "auto", "border":"0px", "border-radius": "0px", "background-color":"#040440"}}>Reset filters</button>
                        </StyledFiltersSection>
                </StyledDetails>
            </StyledSideContext>
        </StyledContainer>
    )
}

const StyledContainer = styled.div`
    width: calc(100vw - 65vw - 10rem);
    flex-basis: 33%;
    max-width: 33%;
    position: relative;
`

const StyledDetails = styled.div`
    display: relative;
    padding-bottom: 1rem;
`

const StyledSideContext = styled.div`
    position: fixed;
    overflow-y: auto;
    flex-basis: 33%;
    max-width: 33%;
    display: flex;
    flex-direction: column;
    padding-top: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
    background-color: #fafafa;
    color: #000;
    font-family: "Roboto", sans-serif;
    button {
        font-size: 0.75rem;
        padding: 0.75rem;
        transition: background-color .5s ease;
        cursor: pointer;
    }
`

const StyledFilterCategory = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    margin-top: 0.5rem;
    margin-bottom: 0.25rem;
    width: 100%;
`

const StyledFiltersSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: 87vh;
    overflow-y: scroll;
    background-color: #fafafa;
    h5:first-child {
        margin-top: 2.5rem;
    }
    button {
        margin-right: 0.5rem;
        font-size: 0.65rem;
        height: 1rem;
        line-height: 0rem;
        border-radius: 0.75rem;
        background-color: transparent;
        border: rgb(186,22,40) 1px solid;
        color: rgb(186,22,40);
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        margin-bottom: 0.5rem;
        font-family: "Roboto", sans-serif;
        &:focus {
            outline: none;
        }
        &:hover {
            background-color: #ddd;
        }
    }
    select {
        font-size: 0.75rem;
        width: 10rem;
        height: 2rem;
        line-height: 0rem;
        margin-right: auto;
        text-align-last: center;
        border-radius: 0;
        background-color: transparent;
        border: #b2b2b2 1px solid;
        color: #b2b2b2;
        border-radius: 0.25rem;
    }
    input {
        background-color: #dedede;
        border: none;
        width: 5rem;
        text-align: right;
        padding: 0.15rem;
        &#name {
            width: 90%;
            text-align: left;
            padding-left: 0.5rem;
        }
    }
    button.active {
        color: white;
        background-color: rgb(186,22,40);
    }
`

export default SearchFilters;