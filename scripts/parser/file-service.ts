/// <reference path="../../typings/references.ts" />
/// <reference path="./LdrawFile.ts" />
/// <reference path="./file-parser.ts" />

module LdrawVisualizer.FileService {
	export function GetPart(partName: string, callback: (part: LdrawVisualizer.LdrawFile) => void) {
		
		var temporaryBrickFileForTesting = '0 Untitled\r\n0 Name: 1st Place Robot Design Round 1.ldr\r\n0 Author: MLCad\r\n0 Unofficial Model\r\n0 ROTATION CENTER 0 0 0 1 \"Custom\" \r\n0 ROTATION CONFIG 0 0\r\n1 67580019 0 24 -10 1 0 0 0 1 0 0 0 1 3034.DAT\r\n1 7 0 24 -50 1 0 0 0 1 0 0 0 1 3738.DAT\r\n1 7 0 24 -90 1 0 0 0 1 0 0 0 1 3738.DAT\r\n1 7 0 24 -170 1 0 0 0 1 0 0 0 1 3738.DAT\r\n1 0 -70 0 -90 0 0 -1 0 1 0 1 0 0 2730.DAT\r\n1 0 70 0 -90 0 0 -1 0 1 0 1 0 0 2730.DAT\r\n0 STEP\r\n1 7 0 0 -100 -1 0 0 0 1 0 0 0 -1 3666.DAT\r\n1 7 40 -72 -70 0 0 -1 0 1 0 1 0 0 71427C01.DAT\r\n1 7 -40 -72 -70 0 0 1 0 1 0 -1 0 0 71427C01.DAT\r\n0 STEP\r\n1 7 70 -8 -150 0 0 -1 0 1 0 1 0 0 3710.DAT\r\n1 7 70 -48 -150 0 0 -1 0 1 0 1 0 0 3710.DAT\r\n1 7 70 -16 -130 0 0 -1 0 1 0 1 0 0 3023.DAT\r\n1 7 -70 -16 -130 0 0 -1 0 1 0 1 0 0 3023.DAT\r\n1 7 70 -40 -170 0 0 -1 0 1 0 1 0 0 3023.DAT\r\n1 0 70 -40 -130 0 0 -1 0 1 0 1 0 0 3700.DAT\r\n1 14 70 -32 -170 0 0 -1 0 1 0 1 0 0 3700.DAT\r\n1 7 -70 -8 -150 0 0 -1 0 1 0 1 0 0 3710.DAT\r\n1 7 -70 -48 -150 0 0 -1 0 1 0 1 0 0 3710.DAT\r\n1 7 -70 -40 -170 0 0 -1 0 1 0 1 0 0 3023.DAT\r\n1 0 -70 -40 -130 0 0 -1 0 1 0 1 0 0 3700.DAT\r\n1 14 -70 -32 -170 0 0 -1 0 1 0 1 0 0 3700.DAT\r\n0 STEP\r\n0 ROTSTEP 5.92105 150.119 0 ABS\r\n1 0 0 0 -10 0 0 -1 0 1 0 1 0 0 3003.DAT\r\n1 0 30 0 -10 0 0 -1 0 1 0 1 0 0 3700.DAT\r\n1 0 -30 0 -10 0 0 -1 0 1 0 1 0 0 3700.DAT\r\n0 STEP\r\n1 0 -100 8 -10 -1 0 0 0 1 0 0 0 -1 3707.DAT\r\n1 7 -50 8 -10 0 0 -1 0 1 0 1 0 0 3713.DAT\r\n1 7 50 8 -10 0 0 -1 0 1 0 1 0 0 3713.DAT\r\n1 0 100 8 -10 -1 0 0 0 1 0 0 0 -1 3707.DAT\r\n0 STEP\r\n1 67580019 0 -8 -10 1 0 0 0 1 0 0 0 1 3034.DAT\r\n1 19 80 8 -70 1 0 0 0 1 0 0 0 1 3749.DAT\r\n1 19 -80 8 -70 -1 0 0 0 1 0 0 0 -1 3749.DAT\r\n1 7 -90 8 -70 0 0 -1 0 1 0 1 0 0 3648.DAT\r\n1 7 90 8 -70 0 0 -1 0 1 0 1 0 0 3648.DAT\r\n1 7 90 8 -10 0 0 -1 0 1 0 1 0 0 3648.DAT\r\n1 7 -90 8 -10 0 0 -1 0 1 0 1 0 0 3648.DAT\r\n1 7 -90 -32 -70 0 0 -1 0 1 0 1 0 0 3647.DAT\r\n1 7 90 -32 -70 0 0 -1 0 1 0 1 0 0 3647.DAT\r\n0 STEP\r\n0 ROTSTEP END\r\n1 7 110 8 -10 0 0 -1 0 1 0 1 0 0 4019.DAT\r\n1 7 -110 8 -10 0 0 -1 0 1 0 1 0 0 4019.DAT\r\n0 STEP\r\n1 15 130 8 -10 0 0 -1 0 1 0 1 0 0 32007.DAT\r\n1 15 -130 8 -10 0 0 -1 0 1 0 1 0 0 32007.DAT\r\n0 STEP\r\n1 7 -150 8 -10 0 0 -1 0 1 0 1 0 0 3713.DAT\r\n1 7 150 8 -10 0 0 -1 0 1 0 1 0 0 3713.DAT\r\n1 14 170 8 -10 0 0 -1 0 1 0 1 0 0 3482.DAT\r\n1 14 -170 8 -10 0 0 -1 0 1 0 1 0 0 3482.DAT\r\n0 STEP\r\n1 7 0 -64 -210 1 0 0 0 1 0 0 0 1 71427C01.DAT\r\n1 0 0 8 -230 1 0 0 0 1 0 0 0 1 3003.DAT\r\n1 7 -30 16 -190 0 0 1 0 1 0 -1 0 0 3023.DAT\r\n1 7 30 16 -190 0 0 1 0 1 0 -1 0 0 3023.DAT\r\n1 7 -30 8 -210 0 0 1 0 1 0 -1 0 0 3710.DAT\r\n1 7 30 8 -210 0 0 1 0 1 0 -1 0 0 3710.DAT\r\n0 STEP\r\n1 0 0 -64 -230 -1 0 0 0 1 0 0 0 -1 5306.DAT\r\n1 0 -60 -72 -70 0 0 1 0 1 0 -1 0 0 5306.DAT\r\n1 0 60 -72 -70 0 0 1 0 1 0 -1 0 0 5306.DAT\r\n0 STEP\r\n1 14 20 -72 -210 0 0 1 0 1 0 -1 0 0 3020.DAT\r\n1 14 -20 -72 -210 0 0 1 0 1 0 -1 0 0 3020.DAT\r\n1 7 0 -24 -270 -1 0 0 0 1 0 0 0 -1 6538B.DAT\r\n0 STEP\r\n1 7 0 32 -250 0 0 -1 0 1 0 1 0 0 32001.DAT\r\n1 7 0 40 -300 1 0 0 0 1 0 0 0 1 3023.DAT\r\n1 0 0 56 -310 1 0 0 0 1 0 0 0 1 2654.DAT\r\n1 7 0 48 -300 1 0 0 0 1 0 0 0 1 3023.DAT\r\n1 0 0 32 -320 1 0 0 0 1 0 0 0 1 3700.DAT\r\n0 STEP\r\n1 7 0 16 -310 1 0 0 0 1 0 0 0 1 32001.DAT\r\n1 7 0 24 -310 1 0 0 0 1 0 0 0 1 32001.DAT\r\n1 0 40 -28 -310 0 1 0 -1 0 0 0 0 1 3707.DAT\r\n1 0 -40 -28 -310 0 1 0 -1 0 0 0 0 1 3707.DAT\r\n1 7 -40 0 -312 1 0 0 0 0 -1 0 1 0 3713.DAT\r\n1 7 40 0 -312 1 0 0 0 0 -1 0 1 0 3713.DAT\r\n0 STEP\r\n1 7 -40 -20 -312 1 0 0 0 0 1 0 -1 0 3650A.DAT\r\n1 7 40 -20 -312 1 0 0 0 0 1 0 -1 0 3650A.DAT\r\n0 STEP\r\n1 7 0 -56 -310 1 0 0 0 1 0 0 0 1 32001.DAT\r\n1 7 40 -64 -310 0 0 -1 0 1 0 1 0 0 3956.DAT\r\n1 7 -40 -64 -310 0 0 1 0 1 0 -1 0 0 3956.DAT\r\n1 7 40 -40 -312 1 0 0 0 0 -1 0 1 0 3713.DAT\r\n1 7 -40 -40 -312 1 0 0 0 0 -1 0 1 0 3713.DAT\r\n0 STEP\r\n1 7 -40 -80 -312 1 0 0 0 0 -1 0 1 0 3713.DAT\r\n1 7 40 -80 -312 1 0 0 0 0 -1 0 1 0 3713.DAT\r\n1 14 0 -64 -290 0 0 1 0 1 0 -1 0 0 3020.DAT\r\n1 0 0 -88 -320 1 0 0 0 1 0 0 0 1 3700.DAT\r\n0 STEP\r\n1 8 -2 -80 -332 0 1 0 0 0 -1 -1 0 0 32002.DAT\r\n1 8 -2 40 -332 0 1 0 0 0 -1 -1 0 0 32002.DAT\r\n0 STEP\r\n1 0 2 -25 -312 0 1 0 0 0 1 1 0 0 3705.DAT\r\n1 0 0 -24 -310 1 0 0 0 1 0 0 0 1 4716.DAT\r\n0 STEP\r\n1 7 0 -24 -345 1 0 0 0 1 0 0 0 1 4265C.DAT\r\n1 0 1 -20 -336 1 0 0 0 0 1 0 -1 0 32065.DAT\r\n0 STEP\r\n1 7 -39 -110 -312 1 0 0 0 0 1 0 -1 0 6538B.DAT\r\n0 STEP\r\n1 7 -39 -162 -309 1 0 0 0 1 0 0 0 1 6553.DAT\r\n1 0 -39 -160 -308 1 0 0 0 0 1 0 -1 0 3705.DAT\r\n1 7 -39 -136 -312 -1 0 0 0 0 -1 0 -1 0 4265C.DAT\r\n0 STEP\r\n1 7 -25 -160 -310 0 0 1 0 1 0 -1 0 0 4265C.DAT\r\n1 7 -55 -160 -310 0 0 1 0 1 0 -1 0 0 4265C.DAT\r\n1 7 -69 -180 -308 1 0 0 0 0 -1 0 1 0 32039.DAT\r\n1 7 -9 -180 -308 1 0 0 0 0 -1 0 1 0 32039.DAT\r\n0 STEP\r\n1 0 -9 -235 -308 0 0 -1 -1 0 0 0 1 0 3706.DAT\r\n1 0 -69 -235 -308 0 0 -1 -1 0 0 0 1 0 3706.DAT\r\n0 STEP\r\n1 7 -70 -265 -308 1 0 0 0 0 -1 0 1 0 3713.DAT\r\n1 7 -10 -265 -308 1 0 0 0 0 -1 0 1 0 3713.DAT\r\n1 7 -69 -285 -326 0 -1 0 -1 0 0 0 0 -1 32039.DAT\r\n1 7 -9 -285 -326 0 -1 0 -1 0 0 0 0 -1 32039.DAT\r\n0 STEP\r\n1 7 1 -72 -270 0 0 1 0 1 0 -1 0 0 3022.DAT\r\n1 67580019 0 -80 -260 1 0 0 0 1 0 0 0 1 2419.DAT\r\n0 STEP\r\n1 0 0 -176 -70 0 0 1 0 1 0 -1 0 0 5306.DAT\r\n1 0 -40 -176 -70 0 0 1 0 1 0 -1 0 0 5306.DAT\r\n1 0 40 -176 -70 0 0 1 0 1 0 -1 0 0 5306.DAT\r\n1 7 0 -168 -110 1 0 0 0 1 0 0 0 1 884.DAT\r\n0 STEP\r\n1 0 80 -24 -170 1 0 0 0 1 0 0 0 1 2780.DAT\r\n1 0 -80 -24 -170 1 0 0 0 1 0 0 0 1 2780.DAT\r\n1 0 -80 -144 -170 1 0 0 0 1 0 0 0 1 32002.DAT\r\n1 0 80 -144 -170 -1 0 0 0 1 0 0 0 -1 32002.DAT\r\n0 STEP\r\n1 0 90 -64 -178 0 0 1 1 0 0 0 1 0 2730.DAT\r\n0 STEP\r\n0 ROTSTEP 20.1316 -56.917 0 ABS\r\n1 0 -90 -85 -180 0 0 1 1 0 0 0 1 0 2730.DAT\r\n0 STEP\r\n0 ROTSTEP END\r\n1 7 90 -105 -188 0 0 1 1 0 0 0 1 0 3023.DAT\r\n1 7 90 -105 -196 0 0 1 1 0 0 0 1 0 3023.DAT\r\n1 0 90 -105 -220 0 0 1 1 0 0 0 1 0 3700.DAT\r\n1 0 90 -105 -244 0 0 1 1 0 0 0 1 0 3004.DAT\r\n1 0 90 -105 -292 0 0 1 1 0 0 0 1 0 3004.DAT\r\n1 0 90 -105 -316 0 0 1 1 0 0 0 1 0 3004.DAT\r\n1 67580019 90 -105 -268 0 0 1 1 0 0 0 1 0 32064.DAT\r\n1 0 90 -245 -340 0 0 1 1 0 0 0 1 0 3703.DAT\r\n0 STEP\r\n1 0 100 -106 -331 -1 0 0 0 -1 0 0 0 1 2780.DAT\r\n1 0 100 -106 -211 -1 0 0 0 -1 0 0 0 1 2780.DAT\r\n1 0 100 -106 -166 -1 0 0 0 -1 0 0 0 1 2780.DAT\r\n0 STEP\r\n1 0 110 -116 -250 0 0 -1 0 1 0 1 0 0 2730.DAT\r\n0 STEP\r\n1 0 90 -464 -340 0 0 -1 -1 0 0 0 1 0 3894.DAT\r\n1 7 90 -425 -348 0 0 -1 -1 0 0 0 1 0 4477.DAT\r\n1 7 90 -425 -316 0 0 -1 -1 0 0 0 1 0 4477.DAT\r\n1 7 90 -465 -356 0 0 -1 -1 0 0 0 1 0 3666.DAT\r\n1 67580019 90 -445 -380 0 0 -1 -1 0 0 0 1 0 32064.DAT\r\n0 STEP\r\n1 19 80 -444 -372 1 0 0 0 -1 0 0 0 -1 3749.DAT\r\n1 7 80 -464 -330 1 0 0 0 -1 0 0 0 -1 3673.DAT\r\n0 STEP\r\n1 0 70 -452 -330 0 0 -1 0 -1 0 -1 0 0 3894.DAT\r\n1 67580019 70 -428 -290 0 0 -1 0 -1 0 -1 0 0 32064.DAT\r\n0 STEP\r\n0 ROTSTEP 20.1316 -55.4941 0 ABS\r\n1 7 -90 -125 -188 0 0 -1 -1 0 0 0 1 0 3023.DAT\r\n1 7 -90 -125 -196 0 0 -1 -1 0 0 0 1 0 3023.DAT\r\n1 0 -90 -125 -220 0 0 -1 -1 0 0 0 1 0 3700.DAT\r\n1 7 -90 -125 -228 0 0 -1 -1 0 0 0 1 0 3023.DAT\r\n0 STEP\r\n1 0 -100 -127 -210 1 0 0 0 -1 0 0 0 -1 2780.DAT\r\n1 0 -100 -127 -170 1 0 0 0 -1 0 0 0 -1 2780.DAT\r\n0 STEP\r\n1 0 -110 -136 -190 0 0 1 0 1 0 -1 0 0 3701.DAT\r\n0 STEP\r\n1 67350587 -120 -5 -188 -1 0 0 0 0 1 0 1 0 2982C01.DAT\r\n1 0 40 -177 -169 0 0 1 0 1 0 -1 0 0 5306.DAT\r\n1 0 -90 -45 -204 0 0 1 1 0 0 0 1 0 3004.DAT\r\n1 7 -90 -45 -212 0 0 -1 -1 0 0 0 1 0 32028.DAT\r\n1 7 -90 -25 -220 0 0 -1 -1 0 0 0 1 0 3743.DAT\r\n0 STEP\r\n0 ROTSTEP END\r\n1 7 0 -176 -10 1 0 0 0 1 0 0 0 1 3832.DAT\r\n0 STEP\r\n1 7 -80 -184 -10 1 0 0 0 1 0 0 0 1 3022.DAT\r\n1 7 80 -184 -10 1 0 0 0 1 0 0 0 1 3022.DAT\r\n1 67350587 80 -192 -10 1 0 0 0 1 0 0 0 1 3022.DAT\r\n1 67350587 -80 -192 -10 1 0 0 0 1 0 0 0 1 3022.DAT\r\n1 67350587 0 -208 -10 1 0 0 0 1 0 0 0 1 3022.DAT\r\n1 0 -80 -216 -10 1 0 0 0 1 0 0 0 1 3003.DAT\r\n1 0 80 -216 -10 1 0 0 0 1 0 0 0 1 3003.DAT\r\n1 0 0 -200 -10 1 0 0 0 1 0 0 0 1 3003.DAT\r\n0 STEP\r\n1 14 -70 -240 -10 0 0 1 0 1 0 -1 0 0 3700.DAT\r\n1 14 70 -240 -10 0 0 1 0 1 0 -1 0 0 3700.DAT\r\n1 0 90 -240 -10 0 0 1 0 1 0 -1 0 0 3700.DAT\r\n1 0 -90 -240 -10 0 0 1 0 1 0 -1 0 0 3700.DAT\r\n0 STEP\r\n1 0 0 -200 -70 1 0 0 0 1 0 0 0 1 2456.DAT\r\n1 7 0 -208 -60 1 0 0 0 1 0 0 0 1 3666.DAT\r\n1 7 0 -208 -80 1 0 0 0 1 0 0 0 1 3666.DAT\r\n0 STEP\r\n1 7 -40 -216 -70 1 0 0 0 1 0 0 0 1 3022.DAT\r\n1 7 40 -216 -70 1 0 0 0 1 0 0 0 1 3022.DAT\r\n1 14 0 -216 -30 0 0 1 0 1 0 -1 0 0 3020.DAT\r\n0 STEP\r\n1 7 0 -224 -60 1 0 0 0 1 0 0 0 1 3666.DAT\r\n1 7 0 -224 -80 1 0 0 0 1 0 0 0 1 3710.DAT\r\n0 STEP\r\n1 67580019 -30 -248 -70 0 0 1 0 1 0 -1 0 0 32064.DAT\r\n1 67580019 30 -248 -70 0 0 1 0 1 0 -1 0 0 32064.DAT\r\n0 STEP\r\n1 7 0 -259 -80 0 0 -1 -1 0 0 0 1 0 879.DAT\r\n1 0 0 -241 -72 -1 0 0 0 -1 0 0 0 1 3705.DAT\r\n1 0 0 -270 -96 0 0 1 1 0 0 0 1 0 5306.DAT\r\n1 0 0 -176 -169 0 0 1 0 1 0 -1 0 0 5306.DAT\r\n0 STEP\r\n1 7 0 -270 -104 -1 0 0 0 0 1 0 1 0 3832.DAT\r\n1 14 -80 -250 -96 0 0 1 1 0 0 0 1 0 3020.DAT\r\n1 7 80 -250 -96 0 0 1 1 0 0 0 1 0 3709B.DAT\r\n0 STEP\r\n0 ROTSTEP 16.5789 159.368 0 ABS\r\n1 0 0 -240 -10 0 0 -1 0 1 0 1 0 0 3003.DAT\r\n1 0 -100 -228 -10 -1 0 0 0 1 0 0 0 -1 3707.DAT\r\n1 0 100 -228 -10 -1 0 0 0 1 0 0 0 -1 3707.DAT\r\n1 7 50 -228 -10 0 0 -1 0 1 0 1 0 0 3713.DAT\r\n1 7 -50 -228 -10 0 0 -1 0 1 0 1 0 0 3713.DAT\r\n0 STEP\r\n1 7 0 -248 -10 1 0 0 0 1 0 0 0 1 3832.DAT\r\n1 7 -110 -228 -10 0 0 1 0 1 0 -1 0 0 4019.DAT\r\n1 7 110 -228 -10 0 0 1 0 1 0 -1 0 0 4019.DAT\r\n0 STEP\r\n1 7 -150 -228 -10 0 0 -1 0 1 0 1 0 0 3713.DAT\r\n1 7 150 -228 -10 0 0 -1 0 1 0 1 0 0 3713.DAT\r\n1 15 130 -228 -10 0 0 -1 0 1 0 1 0 0 32007.DAT\r\n1 15 -130 -228 -10 0 0 -1 0 1 0 1 0 0 32007.DAT\r\n1 14 -170 -228 -10 0 0 -1 0 1 0 1 0 0 3482.DAT\r\n1 14 170 -228 -10 0 0 -1 0 1 0 1 0 0 3482.DAT\r\n1 0 130 -106 -8 0 0 -1 -1 0 0 0 1 0 680C01.DAT\r\n1 0 -130 -106 -8 0 0 -1 -1 0 0 0 1 0 680C01.DAT\r\n0 STEP\r\n0 ROTSTEP END\r\n1 7 -40 45 -330 0 -1 0 -1 0 0 0 0 -1 32039.DAT\r\n1 7 40 45 -330 0 -1 0 -1 0 0 0 0 -1 32039.DAT\r\n0 STEP\r\n1 0 40 45 -445 0 -1 0 0 0 1 -1 0 0 3708.DAT\r\n1 0 -40 45 -445 0 -1 0 0 0 1 -1 0 0 3708.DAT\r\n0 STEP\r\n1 7 -40 44 -350 1 0 0 0 1 0 0 0 1 3713.DAT\r\n1 7 40 44 -350 1 0 0 0 1 0 0 0 1 3713.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -367 1 0 0 0 0 -1 0 1 0 79.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -372 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -377 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -382 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -387 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -392 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -397 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -402 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -407 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -412 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -417 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -422 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -427 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -432 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -437 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -442 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -447 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -452 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -457 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -462 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -467 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -472 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -477 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -482 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -487 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -492 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -497 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -502 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -507 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -512 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -517 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -522 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -527 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -532 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -537 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose\r\n1 0 40 45 -542 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 GROUP 36 hose\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -367 1 0 0 0 0 -1 0 1 0 79.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -372 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -377 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -382 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -387 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -392 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -397 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -402 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -407 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -412 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -417 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -422 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -427 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -432 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -437 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -442 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -447 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -452 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -457 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -462 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -467 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -472 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -477 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -482 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -487 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -492 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -497 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -502 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -507 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -512 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -517 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -522 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -527 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -532 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -537 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 MLCAD BTG hose2\r\n1 0 -40 45 -542 1 0 0 0 0 -1 0 1 0 80.DAT\r\n0 GROUP 36 hose2\r\n0 STEP\r\n1 7 -40 44 -575 -1 0 0 0 1 0 0 0 -1 32015.DAT\r\n1 7 40 44 -575 -1 0 0 0 1 0 0 0 -1 32015.DAT\r\n1 0 40 -61.35 -614.055 0 1 0 0.939693 0 0.34202 0.34202 0 -0.939693 3737.DAT\r\n1 0 -40 -61.35 -614.055 0 1 0 0.939693 0 0.34202 0.34202 0 -0.939693 3737.DAT\r\n0\r\n';
		
		var url = '';
		
		// $.ajax({
		// 	type: 'GET',
		// 	url: url,
		// 	success: (partFile: string) => {
		// 		callback(FileParser.Parse(partFile));
		// 	},
		// 	error: () => {
		// 		// TODO
		// 	},
		// 	dataType: 'text'
		// });
		
		
		callback(Parser.FileParser.Parse(temporaryBrickFileForTesting));
	}
}