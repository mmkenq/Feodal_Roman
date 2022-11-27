import Phaser from "phaser";
import Unit from '../entites/Unit'
import Castle from '../entites/Castle'
import store from '../../../../../store/store';


export default async function getScene(scene) {
    const server = store.getState().server.value;
    const Scene = scene;
    setInterval(
        async () => {
            const data = (await server.getScene());
            if (data?.castles) {
                let castles = data.castles;
                castles.forEach((castle) => {
                    let castleOnScene = scene.castlesGroup.getChildren().find(el => el.id === castle.id);
                    if (castleOnScene) {
                        castleOnScene.rewriteData(castle);
                    } else {
                        new Castle(Scene,castle);
                    }
                }) 
            }
            if (data?.units) {
                data.units.forEach((unit) => {
                    let unitOnScene = Scene.unitsGroup.getChildren().find(el => el.id === unit.id)
                    if (unitOnScene) {
                        unitOnScene.rewriteData(unit);
                    } else {
                        new Unit(scene,unit);
                    }
                }) 
            }
        }
        ,150
    )

    /*const data = (await server.getScene());
    console.log(data);
    if (data?.castles) {
        let castles = data.castles;
        castles.forEach((castle) => {
            let castleOnScene = scene.castlesGroup.getChildren().find(el => el.id === castle.id);
            if (castleOnScene) {
                console.log(123);
                castleOnScene.rewriteData(castle);
            } else {
                new Castle(Scene, castle);
            }
        })
    }
    if (data?.units) {
        data.units.forEach((unit) => {
            let unitOnScene = Scene.unitsGroup.getChildren().find(el => el.id === unit.id)
            if (unitOnScene) {
                unitOnScene.rewriteData(unit);
            } else {
                new Unit(scene, unit);
            }
        })
    }
    setTimeout(()=> getScene(scene), 100);*/
}