import css from './AllUsersTab.module.css'
import imgOne from '../../assets/images/Image1.png'
import imgOneX from '../../assets/images/Image12x.png'
import imgTwo from '../../assets/images/Image2.png'
import imgTwoX from '../../assets/images/Image22x.png'
import imgThree from '../../assets/images/Image3.png'
import imgThreeX from '../../assets/images/Image32x.png'

function AllUsersTab() {
    return (
        <div className={css.usersTab}>
            <div className={css.usersImages}>
            <img
                width={144}
                src={imgOne}
                srcSet={`${imgOne} 1x, ${imgOneX} 2x`}
                alt="User image 1"
            />
            <img
                width={144}
                src={imgTwo}
                srcSet={`${imgTwo} 1x, ${imgTwoX} 2x`}
                alt="User image 2"
            />
            <img
                width={144}
                src={imgThree}
                srcSet={`${imgThree} 1x, ${imgThreeX} 2x`}
                alt="User image 3"
            />
            </div>
            <div className={css.usersInfo}>
                <h2 className={css.usersTitle}>1000 users + </h2>
                <p className={css.usersText}>Trusted by users for reliable expense tracking!</p>
            </div>
        </div>
    )
}

export default AllUsersTab;
