import React from 'react';
import image from '../assets/images/logoebebidas.png';
import ContentWrapper from './ContentWrapper';
import CategoriesInDb from './CategoriesInDb';
import LastProductInDb from './LastProductInDb';
import ContentRowDb from './ContentRowDb';
import UsersInDb from './UsersInDb';
import DetailProduct from './DetailProduct';
import NotFound from './NotFound';
import {Link, Route, Switch} from 'react-router-dom';

function SideBar(){
    return(
        <React.Fragment>
            {/*<!-- Sidebar -->*/}
            <ul className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion" id="accordionSidebar">

                {/*<!-- Sidebar - Brand -->*/}
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                    <div className="sidebar-brand-icon">
                        <br></br>
                        <img className="w-50" src={image} alt="ebebidas"/>
                    </div>
                </a>
                <br></br>
                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider my-0"/>

                {/*<!-- Nav Item - Dashboard -->*/}
                <li className="nav-item active">
                    <Link className="nav-link" to="/">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard - ebebidas</span></Link>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider"/>

                {/*<!-- Heading -->*/}
                <div className="sidebar-heading">Actions</div>

                {/*<!-- Nav Item - Pages -->*/}
                <li className="nav-item">
                <Link className="nav-link" to="/CategoriesInDb">
                        <i className="fas fa-fw fa-folder"></i>
                        <span>Categorias</span>
                    </Link>
                </li>

                {/*<!-- Nav Item - Charts -->*/}
                 <li className="nav-item">
                    <Link className="nav-link" to="/LastProductInDb">
                        <i className="fas fa-fw fa-chart-area"></i>
                        <span>Ultimo producto en DB</span></Link>
                </li> 

                {/*<!-- Nav Item - Tables -->*/}
                <li className="nav-item nav-link">
                <Link className="nav-link" to="/ContentRowDb">
                        <i className="fas fa-fw fa-table"></i>
                        <span>Tablas con totales</span></Link>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider d-none d-md-block"/>

                {/*<!-- Nav Item - Search movies -->*/}
                <li className="nav-item nav-link">
                    <Link className="nav-link" to="/UsersInDb">
                        <i className="fas fa-fw fa-search"></i>
                        <span>Usuarios en DB</span>
                    </Link>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider d-none d-md-block"/>
            </ul>
            {/*<!-- End of Sidebar -->*/}

            {/*<!-- Microdesafio 1 -->*/}
            {/*<!--<Route exact path="/">
                <ContentWrapper />
            </Route>
            <Route path="/GenresInDb">
                <GenresInDb />
            </Route>
            <Route path="/LastMovieInDb">
                <LastMovieInDb />
            </Route>
            <Route path="/ContentRowMovies">
                <ContentRowMovies />
            </Route>*/}
            {/*<!-- End Microdesafio 1 -->*/}

            {/*<!-- End Microdesafio 2 -->*/}
            <Switch>
                <Route exact path="/">
                    <ContentWrapper />
                </Route>
                <Route path="/CategoriesInDb">
                    <CategoriesInDb />
                </Route>
                <Route path="/LastProductInDb">
                    <LastProductInDb />
                </Route> 
                <Route path="/ContentRowDb">
                    <ContentRowDb />
                </Route>
                <Route path="/UsersInDb">
                    <UsersInDb />
                </Route>
                <Route path="/DetailProduct">
                    <DetailProduct />
                </Route>
                <Route component={NotFound} />
            </Switch>
            {/*<!-- End Microdesafio 2 -->*/}
        </React.Fragment>
    )
}
export default SideBar;