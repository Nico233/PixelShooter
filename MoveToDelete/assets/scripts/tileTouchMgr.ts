
import { _decorator, Component, Node, Vec2, Vec3, EventTouch, v3, math, Prefab, tween } from 'cc';
import { Tile } from './tile';
import { tileManager } from './tileManager';
const { ccclass, property } = _decorator;
enum MoveDir {
    None = -1,
    UP,
    Down,
    Left,
    Right
}
@ccclass('TileTouchMgr')
export class TileTouchMgr extends Component {
    @property(Node)
    tile!: Node;
    @property(Tile)
    tileCom!: Tile;

    ifDelete = false;

    touchStartPos!: Vec3;

    touchStartHang: number = -1;
    touchStartLie: number = -1;

    // data = [[1,2],[]];
    currentNum: number = 0;

    delayTime = 0.4;
    moveDownSpeed = 10;

    checkDown = false;

    onLoad() {
        this.tile.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.tile.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.tile.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.tile.on(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    }

    onDestroy() {
        this.tile.off(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.tile.off(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.tile.off(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.tile.off(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    }
    onTouchStart(event: EventTouch) {
        // console.log('----------move start ----------');
        // if (!this.touchStartPos) {
        let target = event.target;
        if (target && target instanceof Node) {
            this.touchStartPos = target.getPosition();
            let hang = Math.floor((this.tile.position.y + 55) / 118);
            let lie = Math.floor((this.tile.position.x) / 118);
            this.currentNum = tileManager.instance.tileData[hang][lie];
            this.touchStartLie = lie;
            this.touchStartHang = hang;
            // console.log(this.touchStartPos);
            tileManager.instance.tileData[hang][lie] = 0;
            tileManager.instance.tileMap[hang][lie] = null;
        }
        // }
    }

    onTouchMove(event: EventTouch) {
        // console.log(event);
        if (event) {
            this.tile.updateWorldTransform
            let location = event.getLocation();
            let pos = new Vec3(location.x - 25, location.y - 25, 0);
            this.checkHasTile1(event.getDelta(), pos);

            // this.tile.position = pos;
            // if (this.tile.position.x >= 645) {
            //     this.tile.setPosition(v3(645, this.tile.position.y, 0));
            // }
            // if (this.tile.position.x <= 55) {
            //     this.tile.setPosition(v3(55, this.tile.position.y, 0));
            // }
            // if (this.tile.position.y >= 881) {
            //     this.tile.setPosition(v3(this.tile.position.x, 881, 0));
            // }
            // if (this.tile.position.y <= 55) {
            //     this.tile.setPosition(v3(this.tile.position.x, 55, 0));
            // }


        }
    }

    checkHasTile1(delta: Vec2, posLocation: Vec3) {
        let tileHang = Math.floor((this.tile.position.y) / 118);
        let tileLie = Math.floor((this.tile.position.x) / 118);

        let hang = Math.floor((posLocation.y) / 118);
        let lie = Math.floor((posLocation.x) / 118);

        let lieLeft = Math.floor((posLocation.x - 55) / 118);
        let lieRight = Math.floor((posLocation.x + 55) / 118);
        let hangUp = Math.floor((posLocation.y + 55) / 118);
        let hangDown = Math.floor((posLocation.y - 55) / 118);
        // console.log(hang, lie);

        // if (tileManager.instance.tileData[hang][lie] == 0) {
        //     this.tile.setPosition(posLocation);
        //     return;
        // }

        let posx
            = this.checkBlockHangTile(delta, posLocation);
        // posx = posLocation.x;
        let posy;
        let pos;

        posy = this.checkBlockLieTile(delta, posLocation);


        // }
        let finLie = Math.floor((this.tile.position.x) / 118);
        let Lie = Math.floor((posx) / 118);
        // let finLieU = Math.floor((posy + 55) / 118);
        let finHang = Math.floor((this.tile.position.y) / 118);
        let Hang = Math.floor((posy) / 118);
        // let finHangR = Math.floor((posx + 55) / 118);

        let disX = posLocation.x - this.tile.position.x;

        // if (disX > 0) {
        //     if (tileManager.instance.tileData[finHang][Lie - 1] != 0) {
        //         console.log('*******left********');
        //         posx = 55 + 118 * finLie;
        //     }
        // }
        // if (disX < 0) {
        //     if (tileManager.instance.tileData[finHang][Lie + 1] != 0) {
        //         console.log('*******right********');
        //         posx = 55 + 118 * finLie;
        //     }
        // }

        // finHang > 0 && finHang < 8) {


        // if (tileManager.instance.tileData[finHang + 1][Lie] != 0) {
        //     posy = 55 + 118 * finHang;
        // }
        // if (tileManager.instance.tileData[finHang - 1][lie] != 0) {
        //     posy = 55 + 118 * finHang;
        // }
        // }
        // let pos = v3(tileLie * 118 + 55, posLocation.y, 0);
        if (finLie > 0 && finLie < 5 && finHang > 0 && finHang < 8) {

            // console.log(finHang, finLie);
            // console.log(tileManager.instance.tileData[finHang][finLie - 1],
            //     tileManager.instance.tileData[finHang][finLie + 1]);

            // if (finLie == 0 || finLie == 5) {
            //     if (tileManager.instance.tileData[finHang][finLie] != 0) {
            //         posy = 55 + 118 * finHang;
            //     }
            // } else {
            // if (tileManager.instance.tileData[finHang + 1][finLie] != 0) {
            //     posy = 55 + 118 * finHang;
            // }
            // if (tileManager.instance.tileData[finHang - 1][lie] != 0) {
            //     posy = 55 + 118 * finHang;
            // }
            // }

            // if (finHang > 0 && finHang < 8) {

            // if (tileManager.instance.tileData[finHang + 1][finLie] != 0) {
            //     posx = 55 + 118 * Hang;
            // }
            // if (tileManager.instance.tileData[finHang - 1][finLie] != 0) {
            //     posx = 55 + 118 * Hang;
            // }
            // }
        }


        pos = v3(posx, posy, 0);

        if (this.touchStartLie != finLie && this.touchStartHang != -1 && this.touchStartLie != -1) {
            tileManager.instance.tilesMoveDown(this.touchStartHang, this.touchStartLie);
            this.touchStartHang = this.touchStartLie = -1;
        }

        if (!this.ifDelete) {
            this.tile.setPosition(pos);
        }

        // }
    }

    checkBlockHangTile(delta: Vec2, posLocation: Vec3) {
        let tileLie = Math.floor((this.tile.position.x) / 118);
        let tileHang = Math.floor((this.tile.position.y) / 118);
        // let tileHang = Math.floor((this.tile.position.y) / 118);
        let tileLieLeft = Math.floor((this.tile.position.x - 55) / 118);

        // let tileHang = Math.floor((this.tile.position.y) / 118);
        let tileLieRight = Math.floor((this.tile.position.x + 55) / 118);

        let hang = Math.floor((posLocation.y) / 118);
        let lie = Math.floor((posLocation.x) / 118);
        let lieLeft = Math.floor((posLocation.x - 55) / 118);
        let lieRight = Math.floor((posLocation.x + 55) / 118);
        let posx;
        // console.log(tileHang);

        let disX = posLocation.x - this.tile.position.x;
        if (hang >= 7) {
            hang = 7;
        }
        if (hang <= 0) {
            hang = 0;
        }
        if (tileHang >= 7) {
            tileHang = 7;
        }
        if (tileHang <= 0) {
            tileHang = 0;
        }

        if (lie <= 0) {
            lie = 0;
        }
        if (lie >= 5) {
            lie = 5;
        }
        if (lieRight > 5) {
            lieRight = 5;
        }
        if (lieLeft < 0) {
            lieLeft = 0;
        }
        // 往左滑动
        if (disX < 0) {
            if (tileLie >= 0) {
                if (tileLie > 0) {
                    // 检测左边相同合并消除
                    if (tileManager.instance.tileData[tileHang][tileLie - 1] != 0) {
                        if (tileManager.instance.tileData[tileHang][tileLie - 1] == this.currentNum) {
                            if (posLocation.x - 55 <= (tileLie - 1) * 118) {
                                this.currentNum++;
                                this.ifDelete = true;
                                tileManager.instance.tilesDelete(MoveDir.Left, tileHang, tileLie - 1, this.currentNum, this.tileCom);

                            }
                            // return posLocation.x;
                        }
                        // console.log(tileLie);
                        if (posLocation.x >= tileLie * 118 + 55) {
                            return posLocation.x;
                        }
                        return tileLie * 118 + 55;
                    } else {
                        for (let i = tileLie; i >= 0; i--) {
                            if (i > 0) {
                                if (tileManager.instance.tileData[tileHang][i - 1] != 0) {
                                    // , Math.floor(posLocation.y / 118));
                                    if (Math.floor(posLocation.x / 118) >= i) {
                                        if (Math.floor(posLocation.x / 118) == 0) {
                                            return 55;
                                        }
                                        return posLocation.x;
                                    } else {
                                        return i * 118 + 55;
                                    }
                                } else {
                                    continue;
                                }
                            } else {
                                if (tileManager.instance.tileData[tileHang][i] == 0) {
                                    // , Math.floor(posLocation.y / 118));
                                    if (Math.floor(posLocation.x / 118) >= i) {
                                        // if (Math.floor(posLocation.x / 118) == 0) {
                                        //     return 55;
                                        // }
                                        return posLocation.x;
                                    } else {
                                        return i * 118 + 55;
                                    }
                                }
                            }
                        }
                    }
                }
                // else {
                //     if (posLocation.x >= 55) {
                //         return posLocation.x;
                //     } else {
                //         return 55;
                //     }
                // }


            }
            if (tileManager.instance.tileData[tileHang][lieLeft] != 0) {
                return tileLie * 118 + 55;
            }
            // if (lieRight < 5) {
            if (tileManager.instance.tileData[tileHang][lieRight] != 0) {
                return tileLie * 118 + 55;
            }
            // }
            if (lieLeft == lieRight) {
                return tileLie * 118 + 55;
            }
            return posLocation.x;
        } else {
            // 向右滑动
            if (tileLie < 5) {
                // 检测右边相同消除
                if (tileManager.instance.tileData[tileHang][tileLie + 1] != 0) {
                    if (tileManager.instance.tileData[tileHang][tileLie + 1] == this.currentNum) {
                        if (posLocation.x - 55 >= (tileLie + 1) * 118) {
                            this.currentNum++;
                            this.ifDelete = true;
                            tileManager.instance.tilesDelete(MoveDir.Right, tileHang, tileLie + 1, this.currentNum, this.tileCom);

                        }
                        // return posLocation.x;
                    }
                    if (posLocation.x <= tileLie * 118 + 55) {
                        return posLocation.x;
                    }
                    return tileLie * 118 + 55;
                } else {
                    for (let i = tileLie; i <= 5; i++) {
                        if (i < 5) {
                            if (tileManager.instance.tileData[tileHang][i + 1] != 0) {
                                if (Math.floor(posLocation.x / 118) <= i) {
                                    if (Math.floor(posLocation.x / 118) >= 5) {
                                        return 5 * 118 + 55;
                                    }
                                    return posLocation.x;
                                } else {
                                    return i * 118 + 55;
                                }
                            } else {
                                continue;
                            }
                        } else {
                            if (tileManager.instance.tileData[tileHang][i] == 0) {
                                if (Math.floor(posLocation.x / 118) <= i) {
                                    // if (Math.floor(posLocation.x / 118) >= 5) {
                                    //     return 5 * 118 + 55;
                                    // }
                                    return posLocation.x;
                                } else {
                                    return i * 118 + 55;
                                }
                            }
                        }
                    }
                }
            }
            if (tileManager.instance.tileData[tileHang][lieRight] != 0) {
                return tileLie * 118 + 55;
            }
            // }
            if (tileManager.instance.tileData[tileHang][lieLeft] != 0) {
                return tileLie * 118 + 55;
            }
            if (lieLeft == lieRight) {
                return tileLie * 118 + 55;
            }
            return posLocation.x;
        }



    }

    checkBlockLieTile(delta: Vec2, posLocation: Vec3) {
        let tileLie = Math.floor((this.tile.position.x) / 118);

        let tileHang = Math.floor((this.tile.position.y) / 118);
        let tileLieLeft = Math.floor((this.tile.position.x - 55) / 118);

        // let tileHang = Math.floor((this.tile.position.y) / 118);
        let tileLieRight = Math.floor((this.tile.position.x + 55) / 118);

        let hangUp = Math.floor((posLocation.y + 55) / 118);
        let hangDown = Math.floor((posLocation.y - 55) / 118);
        let hang = Math.floor((posLocation.y) / 118);
        let lie = Math.floor((posLocation.x) / 118);

        let disY = posLocation.y - this.tile.position.y;

        if (tileHang >= 7) {
            tileHang = 7;
        }
        if (hangDown <= 0) {
            hangDown = 0;
        }
        if (hangDown >= 7) {
            hangDown = 7;
        }
        if (hangUp <= 0) {
            hangUp = 0;
        }
        if (hangUp >= 7) {
            hangUp = 7;
        }
        if (hang <= 0) {
            hang = 0;
        }
        if (hang >= 7) {
            hang = 7;
        }


        if (lie <= 0) {
            lie = 0;
        }
        if (lie >= 5) {
            lie = 5;
        }
        if (tileLie <= 0) {
            tileLie = 0;
        }
        if (tileLie >= 5) {
            tileLie = 5;
        }


        if (disY < 0) {
            // 向下滑动
            // console.log(tileManager.instance.tileData[hang][lieLeft]);
            if (tileHang >= 0) {
                if (tileHang > 0) {
                    if (tileManager.instance.tileData[tileHang - 1][tileLie] == 0) {
                        for (let i = hang; i < 8; i++) {
                            if (tileManager.instance.tileData[i][tileLie] == 0) {
                                if (Math.floor(posLocation.y / 118) >= i) {
                                    return posLocation.y;
                                } else {
                                    return i * 118 + 55;
                                }
                            }
                            continue;
                        }
                    } else {
                        if (tileManager.instance.tileData[tileHang - 1][tileLie] == this.currentNum) {
                            if (posLocation.y - 55 <= (tileHang - 1) * 118) {
                                this.currentNum++;
                                this.ifDelete = true;
                                tileManager.instance.tilesDelete(MoveDir.Down, tileHang - 1, tileLie, this.currentNum, this.tileCom);

                            }
                            // return posLocation.x;
                        }
                        if (posLocation.y >= tileHang * 118 + 55) {
                            return posLocation.y;
                        }
                        return tileHang * 118 + 55;
                    }
                }
                else {
                    if (posLocation.y >= 55) {
                        return posLocation.y;
                    } else {
                        return 55;
                    }
                }
            }
            if (tileManager.instance.tileData[hangDown][tileLie] != 0) {
                return tileHang * 118 + 55;
            }
            if (tileManager.instance.tileData[hangUp][tileLie] != 0) {
                return tileHang * 118 + 55;
            }
            if (hangDown == hangUp) {
                return tileHang * 118 + 55;
            }
            return posLocation.y;
        }
        else {
            // 向上滑动
            if (tileHang < 7) {
                if (tileManager.instance.tileData[tileHang + 1][tileLie] != 0) {
                    if (tileManager.instance.tileData[tileHang + 1][tileLie] == this.currentNum) {
                        if (posLocation.y - 55 >= (tileHang + 1) * 118) {
                            this.currentNum++;
                            this.ifDelete = true;
                            tileManager.instance.tilesDelete(MoveDir.UP, tileHang + 1, tileLie, this.currentNum, this.tileCom);

                        }
                        // return posLocation.x;
                    }
                    if (posLocation.y <= tileHang * 118 + 55) {
                        return posLocation.y;
                    }
                    return tileHang * 118 + 55;
                }
                else {
                    // console.log(tileLie);
                    for (let i = hang; i < 8; i++) {
                        if (tileManager.instance.tileData[i][tileLie] == 0) {
                            return posLocation.y;
                        }
                        continue;
                    }
                }
            }
            if (tileManager.instance.tileData[hangUp][tileLie] != 0) {
                return tileHang * 118 + 55;
            }
            // if (hangDown > 0) {
            if (tileManager.instance.tileData[hangDown][tileLie] != 0) {
                return tileHang * 118 + 55;
            }
            // }
            if (hangDown == hangUp) {
                return tileHang * 118 + 55;
            }
            return posLocation.y;
            // this.tile.setPosition(posLocation);
        }
    }
    onTouchEnd() {
        tileManager.instance.isShowBlock(true);
        // console.log('----------move end ----------');
        let finHang = Math.floor((this.tile.position.y - 55) / 118);
        let finLie = Math.floor((this.tile.position.x) / 118);
        // console.log(finHang, finLie);
        this.tile.setPosition(v3(finLie * 118 + 55, finHang * 118 + 55, 0));
        let hang: number = finHang;
        let hasdelete = false;
        for (let i = finHang; i >= 0; i--) {
            if (tileManager.instance.tileData[i][finLie] == 0) {
                hang = i;
                if (i > 0) {
                    if (tileManager.instance.tileData[i - 1][finLie] == this.currentNum) {
                        hang = i - 1;
                        this.currentNum += 1;
                        // hasdelete = true;
                    }

                }
            }
        }
        if (this.tileCom.hang == hang && this.tileCom.lie == finLie) {
            tileManager.instance.tileData[hang][finLie] = this.currentNum;
            tileManager.instance.tileMap[hang][finLie] = this.tile;
        }
        // console.log(finHang - hang);
        tileManager.instance.delayTime = (finHang - hang) * 1.5 / this.moveDownSpeed;

        setTimeout(() => {
            if (this.touchStartHang != hang) {
                tileManager.instance.tilesDelete(MoveDir.Down, hang, finLie, this.currentNum, this.tileCom);
                // tileManager.instance.tilesMoveDown(hang, finLie);
            }
            // if (this.tileCom.hang == hang && this.tileCom.lie == finLie) {
            //     tileManager.instance.tileData[this.touchStartHang][this.touchStartLie] = this.currentNum;
            //     tileManager.instance.tileMap[this.touchStartHang][this.touchStartLie] = this.tile;
            // }


        }, 1000 * tileManager.instance.delayTime);
        // console.log(this.currentNum);

        // if (hang != finHang) {

        // } else {

        // }
        tween(this.tile)
            .to(tileManager.instance.delayTime, { position: v3(finLie * 118 + 55, hang * 118 + 55, 0) })
            .repeat(1)
            .start();

        setTimeout(() => {
            tileManager.instance.isShowBlock(false);
            // tileManager.instance.tileData[hang][finLie] = this.currentNum;
            // if (hasdelete) {
            //     if (tileManager.instance.tileMap[hang][finLie]) {
            //         tileManager.instance.tileMap[hang][finLie].fresh(this.currentNum);
            //     }
            // }
            // console.log(tileManager.instance.tileData);
            this.currentNum = 0;
        }, 1000 * tileManager.instance.delayTime);
    }

    checkSameAdd() {

    }


    start() {

    }


}
