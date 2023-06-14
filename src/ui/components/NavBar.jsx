import { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/context/AuthContext';
import { DcPage } from '../../heroes';

export const Navbar = () => {

    //Custom hook para navegar
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);
    //console.log(user);

    const onLogOut = () => {
        logout();
        //navegamos al login
        navigate('/login', {
            replace: true
        });
    }
    //El replace remplaza la ruta por la actual, si intenci'on es que no se pueda volver a atras
    //Probar en incognito

    const rol = JSON.parse(localStorage.getItem('rol'));

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark padding-2">

            <Link
                className="navbar-brand"
                to="/"
            >
                Asociaciones
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav">

                    <NavLink
                        className={({ isActive }) => `nav-link ${isActive ? `active` : ``}`}
                        to="/marvel"
                    >
                        Marvel
                    </NavLink>

                    <NavLink
                        className={({ isActive }) => `nav-link ${isActive ? `active` : ``}`}
                        to="/dc"
                    >
                        DC
                    </NavLink>


                    <NavLink
                        className={({ isActive }) => `nav-link ${isActive ? `active` : ``}`}
                        to="/search"
                    >
                        Search
                    </NavLink>


                    {
                        (rol === 'ADMIN_ROLE')
                            ? <NavLink
                                className={({ isActive }) => `nav-link ${isActive ? `active` : ``}`}
                                to="/admin"
                            >
                                Admin
                            </NavLink>
                            :
                             ""
                    }


                    {
                        (rol === 'USER_ROLE')
                            ? <NavLink
                                className={({ isActive }) => `nav-link ${isActive ? `active` : ``}`}
                                to="/user"
                            >
                                User
                            </NavLink>
                            :
                            ""
                    }





                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                <ul className="navbar-nav ml-auto">
                    <span className='nav-item nav-link text-primary'>
                        {/* Se le pone el ? para que no de error al ser undefined */}
                        {user?.name}
                    </span>
                    <button className='nav-item nav-link btn'
                        onClick={onLogOut}>
                        LogOut
                    </button>
                </ul>
            </div>

        </nav>
    )
}